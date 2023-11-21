import { Request, Response } from "express";
import twilio from "twilio";
import OtpModel, { OtpDocument } from "../models/otpModel";
// || "AC73413742637bc4ab558dadd5b072dbc6"
// || "TWILIO_AUTH_TOKEN = 3698c0fc7e7544c0c80c72d96620e624";
const accountSid: string =
  process.env.TWILIO_ACCOUNT_SID || "AC73413742637bc4ab558dadd5b072dbc6";
const authToken: string =
  process.env.TWILIO_AUTH_TOKEN || "3698c0fc7e7544c0c80c72d96620e624";

const client: twilio.Twilio = twilio(accountSid, authToken);

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

const generateOtp = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { identifier } = req.body;

    // Check if the user is temporarily locked out
    const lockedUser: OtpDocument | null = await OtpModel.findOne({
      identifier,
      lockoutUntil: { $gt: new Date() },
    });

    if (lockedUser) {
      const lockoutRemainingMinutes = Math.ceil(
        (lockedUser.lockoutUntil.getTime() - new Date().getTime()) / (60 * 1000)
      );

      return res.status(400).send({
        success: false,
        error: "Verification Limit Exceeded",
        message: `You have exceeded the maximum verification attempts. Please try again after ${lockoutRemainingMinutes} minutes.`,
      });
    }

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via Twilio SMS
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      to: `+91${identifier}`, // Replace with the user's mobile number
      from: "+14022898276", // Replace with your Twilio phone number
    });

    // Save OTP to the database
    const otpRecord: OtpDocument | null = await OtpModel.findOne({
      identifier,
    });

    if (otpRecord) {
      // Add the new OTP to the existing array
      otpRecord.passwords.push({
        code: otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        verified: false,
        requestedAt: undefined,
        serviceProvider: "",
        serviceProviderResponse: undefined,
      });
      otpRecord.failedAttempts = 0;
      await otpRecord.save();
    } else {
      // Create a new OTP record if the user doesn't exist
      const sendOTP = new OtpModel({
        identifier,
        passwords: [
          { code: otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }, // 5 minutes expiration
        ],
        failedAttempts: 0,
      });
      await sendOTP.save();
    }

    console.log("OTP sent successfully:", message.sid);

    res.status(200).send({
      message: "OTP sent successfully",
      otpSid: message.sid,
      success: true,
    });
  } catch (error) {
    console.error("Error generating OTP:", error);

    res.status(500).send({
      error: "Internal server error",
      message: error.message,
      success: false,
    });
  }
};

const verifyOtp = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { identifier, userEnteredOTP } = req.body;

    // Find the OTP record in the database
    const otpRecord: OtpDocument | null = await OtpModel.findOne({
      identifier,
    });

    if (
      !otpRecord ||
      !otpRecord.passwords ||
      otpRecord.passwords.length === 0
    ) {
      return res.status(404).send({
        success: false,
        error: "OTP not found",
        message: "Please generate a new OTP.",
      });
    }

    // Check if the account is locked due to too many failed attempts
    if (otpRecord.failedAttempts >= MAX_FAILED_ATTEMPTS) {
      const lockoutEndTime = new Date(otpRecord.lockoutUntil || "");

      if (lockoutEndTime > new Date()) {
        const remainingLockoutTime = Math.ceil(
          (lockoutEndTime.getTime() - new Date().getTime()) /
            (LOCKOUT_DURATION_MINUTES * 60 * 1000)
        );

        return res.status(403).send({
          success: false,
          error: "Account locked",
          message: `Too many failed attempts. Try again after ${remainingLockoutTime} minutes.`,
        });
      } else {
        // Reset lockout timestamp and failed attempts if the lockout period has passed
        otpRecord.failedAttempts = 0;
        otpRecord.lockoutUntil = null;
      }
    }

    // Access the latest OTP directly using $slice
    const latestOTP = otpRecord.passwords.slice(-1)[0];

    // Check if the OTP has already been verified
    if (latestOTP.verified) {
      return res.status(400).send({
        success: false,
        error: "Invalid OTP",
        message: "This OTP has already been used.",
      });
    }

    // Calculate expiration time (15 minutes from creation)
    const expirationTime = new Date(
      latestOTP.expiresAt.getTime() + LOCKOUT_DURATION_MINUTES * 60 * 1000
    );

    // Check if the OTP has expired
    if (expirationTime < new Date()) {
      return res.status(400).send({
        success: false,
        error: "OTP expired",
        message: "Please generate a new OTP.",
      });
    }

    // Check if the entered OTP matches the stored OTP
    if (latestOTP.code === userEnteredOTP) {
      // Mark the OTP as verified
      latestOTP.verified = true;
      otpRecord.failedAttempts = 0;
      otpRecord.lockoutUntil = null;
    } else {
      // Increment failed attempts
      otpRecord.failedAttempts += 1;

      if (otpRecord.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        otpRecord.lockoutUntil = new Date(
          Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000
        );
      }
    }

    await otpRecord.save();

    // Respond based on the verification result
    if (latestOTP.verified) {
      return res.status(200).send({
        success: true,
        message: "OTP verified successfully",
      });
    } else {
      // Include information about lockout in the response
      const response = {
        success: false,
        error: "Invalid OTP",
        message: "Please enter a valid OTP.",
        lockout: null,
      };

      if (otpRecord.lockoutUntil) {
        const remainingLockoutTime = Math.ceil(
          (otpRecord.lockoutUntil.getTime() - new Date().getTime()) /
            (60 * 1000) // convert milliseconds to minutes
        );
        response.lockout = {
          until: otpRecord.lockoutUntil,
          remainingTime: remainingLockoutTime,
        };
      }

      return res.status(400).send(response);
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).send({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export { generateOtp, verifyOtp };