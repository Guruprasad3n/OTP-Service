// import { Request, Response } from "express";
// import OtpModel from "../models/otpModel";
// import { generateOtp, verifyOtp } from "../controllers/otpController";
// // import { jest } from "jest";

// jest.mock("../models/otpModel");

// describe("OTP Controller Tests", () => {
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   describe("generateOtp", (): undefined => {
//     it("should generate and send OTP successfully", async () => {
//       const req = { body: { identifier: "1234567890" } } as Request;
//       const res = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce(null);

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest
//         .fn()
//         .mockImplementation((code: number) => ({
//           send: sendMock,
//           status: jest.fn(() => ({
//             send: sendMock,
//             status: jest.fn(),
//           })),
//         }));

//       await generateOtp(req, res);

//       expect(statusMock).toHaveBeenCalledWith(200);
//       expect(sendMock).toHaveBeenCalledWith({
//         message: "OTP sent successfully",
//         success: true,
//       });
//     });

//     it("should handle locked user and return an error message", async () => {
//       const req = { body: { identifier: "lockedUser" } } as Request;
//       const res = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
//         identifier: "lockedUser",
//         lockoutUntil: new Date(Date.now() + 10 * 60 * 1000), // Lockout for 10 minutes
//       });

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest
//         .fn()
//         .mockImplementation((code: number) => ({
//           send: sendMock,
//           status: jest.fn(() => ({
//             send: sendMock,
//             status: jest.fn(),
//           })),
//         }));

//       await generateOtp(req, res);

//       expect(statusMock).toHaveBeenCalledWith(400);
//       expect(sendMock).toHaveBeenCalledWith({
//         success: false,
//         error: "Verification Limit Exceeded",
//         message: expect.any(String),
//       });
//     });

//     // Add more test cases for different scenarios
//   });

//   describe("verifyOtp", () => {
//     it("should verify OTP successfully", async () => {
//       const req = {
//         body: { identifier: "1234567890", userEnteredOTP: "123456" },
//       } as Request;
//       const res = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
//         identifier: "1234567890",
//         passwords: [{ code: "123456", verified: false }],
//         failedAttempts: 0,
//       });

//       const saveMock = jest.fn();
//       (OtpModel.prototype as any).save = saveMock;

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest
//         .fn()
//         .mockImplementation((code: number) => ({
//           send: sendMock,
//           status: jest.fn(() => ({
//             send: sendMock,
//             status: jest.fn(),
//           })),
//         }));

//       await verifyOtp(req, res);

//       expect(saveMock).toHaveBeenCalled();
//       expect(statusMock).toHaveBeenCalledWith(200);
//       expect(sendMock).toHaveBeenCalledWith({
//         success: true,
//         message: "OTP verified successfully",
//       });
//     });

//     it("should handle invalid OTP and return an error message", async () => {
//       const req = {
//         body: { identifier: "1234567890", userEnteredOTP: "654321" },
//       } as Request;
//       const res = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
//         identifier: "1234567890",
//         passwords: [{ code: "123456", verified: false }],
//         failedAttempts: 0,
//       });

//       const saveMock = jest.fn();
//       (OtpModel.prototype as any).save = saveMock;

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest
//         .fn()
//         .mockImplementation((code: number) => ({
//           send: sendMock,
//           status: jest.fn(() => ({
//             send: sendMock,
//             status: jest.fn(),
//           })),
//         }));

//       await verifyOtp(req, res);

//       expect(saveMock).toHaveBeenCalled();
//       expect(statusMock).toHaveBeenCalledWith(400);
//       expect(sendMock).toHaveBeenCalledWith({
//         success: false,
//         error: "Invalid OTP",
//         message: "Please enter a valid OTP.",
//         lockout: null,
//       });
//     });

//     // Add more test cases for different scenarios
//   });
// });
