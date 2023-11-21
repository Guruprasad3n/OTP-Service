const twilio = require("twilio");
const dotenv = require("dotenv").config();
const OtpModel = require("../models/otpModel");
const cron = require("node-cron");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const generateOtp = async (req, res) => {
  try {
    const { identifier } = req.body;

    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP via Twilio SMS
    const message = await client.messages.create({
      body: `Your OTP is: ${otp}`,
      to: `+91${identifier}`, // Replace with the user's mobile number
      from: "+12086275218", // Replace with your Twilio phone number
    });

    // Save OTP to the database
    const otpRecord = await OtpModel.findOne({ identifier });

    if (otpRecord) {
      // Add the new OTP to the existing array
      otpRecord.passwords.push({
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      }); // 10 minutes expiration
      await otpRecord.save();
    } else {
      // Create a new OTP record if the user doesn't exist
      const sendOTP = new OtpModel({
        identifier,
        passwords: [
          { code: otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) },
        ], // 10 minutes expiration
      });
      await sendOTP.save();
    }

    console.log("OTP sent successfully:", message.sid);

    res
      .status(200)
      .send({ message: "OTP sent successfully", otpSid: message.sid });
  } catch (error) {
    console.error("Error generating OTP:", error);

    res
      .status(500)
      .send({ error: "Internal server error", message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { identifier, userEnteredOTP } = req.body;

    // Find the OTP record in the database
    const otpRecord = await OtpModel.findOne({ identifier });

    if (
      !otpRecord ||
      !otpRecord.passwords ||
      otpRecord.passwords.length === 0
    ) {
      return res
        .status(404)
        .send({
          error: "OTP not found",
          message: "Please generate a new OTP.",
        });
    }

    // Sort the otpList array to get the latest OTP
    const bc = otpRecord.passwords.sort((a, b) => b.requestedAt - a.requestedAt);
    const latestOTP = otpRecord.passwords[0];
    console.log(latestOTP.code);

    // Calculate expiration time (10 minutes from creation)
    const expirationTime = new Date(
      latestOTP.requestedAt.getTime() + 10 * 60 * 1000
    );

    // Check if the OTP has expired
    if (expirationTime < new Date()) {
      return res
        .status(400)
        .send({ error: "OTP expired", message: "Please generate a new OTP." });
    }

    // Check if the entered OTP matches the stored OTP
    if (latestOTP.code === userEnteredOTP) {
      // Mark the OTP as verified
      latestOTP.verified = true;
      await otpRecord.save();

      return res.status(200).send({ message: "OTP verified successfully" });
    } else {
      return res
        .status(400)
        .send({ error: "Invalid OTP", message: "Please enter a valid OTP." });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .send({ error: "Internal server error", message: error.message });
  }
};

const cleanupDatabase = async () => {
  try {
    const result = await OtpModel.updateMany(
      { 'passwords.expiresAt': { $lt: new Date() } },
      { $pull: { passwords: { expiresAt: { $lt: new Date() } } } },
      { multi: true }
    );

    console.log(`Cleanup successful. Deleted ${result.nModified} records.`);
  } catch (error) {
    console.error("Error during database cleanup:", error);
  }
};

// Schedule the cleanup function to run every minute (for testing)
cron.schedule("0 0 * * *", async () => {
  console.log("Running database cleanup...");
  await cleanupDatabase();
});

module.exports = { generateOtp, verifyOtp, cleanupDatabase };
