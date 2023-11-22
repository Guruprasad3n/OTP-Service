import { Request, Response } from "express";
import OtpModel from "../models/otpModel";
import { generateOtp, verifyOtp } from "../controllers/otpController";

jest.mock("../models/otpModel");

describe("OTP Controller Tests", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("generateOtp", (): undefined => {
    it("should generate and send OTP successfully", async () => {
      const req = { body: { identifier: "1234567890" } } as Request;
      const res = {} as Response;

      (OtpModel.findOne as jest.Mock).mockResolvedValueOnce(null);

      const sendMock: jest.Mock = jest.fn();
      const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
        send: sendMock,
        status: jest.fn(() => ({
          send: sendMock,
          status: jest.fn(),
        })),
      }));

      await generateOtp(req, res);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        message: "OTP sent successfully",
        success: true,
      });
    });

    it("should handle locked user and return an error message", async () => {
      const req = { body: { identifier: "lockedUser" } } as Request;
      const res = {} as Response;

      (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
        identifier: "lockedUser",
        lockoutUntil: new Date(Date.now() + 10 * 60 * 1000), // Lockout for 10 minutes
      });

      const sendMock: jest.Mock = jest.fn();
      const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
        send: sendMock,
        status: jest.fn(() => ({
          send: sendMock,
          status: jest.fn(),
        })),
      }));

      await generateOtp(req, res);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        success: false,
        error: "Verification Limit Exceeded",
        message: expect.any(String),
      });
    });

    // Add more test cases for different scenarios
  });

  describe("verifyOtp", () => {
    it("should verify OTP successfully", async () => {
      const req = { body: { identifier: "1234567890", userEnteredOTP: "123456" } } as Request;
      const res = {} as Response;

      (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
        identifier: "1234567890",
        passwords: [{ code: "123456", verified: false }],
        failedAttempts: 0,
      });

      const saveMock = jest.fn();
      (OtpModel.prototype as any).save = saveMock;

      const sendMock: jest.Mock = jest.fn();
      const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
        send: sendMock,
        status: jest.fn(() => ({
          send: sendMock,
          status: jest.fn(),
        })),
      }));

      await verifyOtp(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(sendMock).toHaveBeenCalledWith({
        success: true,
        message: "OTP verified successfully",
      });
    });

    it("should handle invalid OTP and return an error message", async () => {
      const req = { body: { identifier: "1234567890", userEnteredOTP: "654321" } } as Request;
      const res = {} as Response;

      (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
        identifier: "1234567890",
        passwords: [{ code: "123456", verified: false }],
        failedAttempts: 0,
      });

      const saveMock = jest.fn();
      (OtpModel.prototype as any).save = saveMock;

      const sendMock: jest.Mock = jest.fn();
      const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
        send: sendMock,
        status: jest.fn(() => ({
          send: sendMock,
          status: jest.fn(),
        })),
      }));

      await verifyOtp(req, res);

      expect(saveMock).toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(sendMock).toHaveBeenCalledWith({
        success: false,
        error: "Invalid OTP",
        message: "Please enter a valid OTP.",
        lockout: null,
      });
    });

    // Add more test cases for different scenarios
  });
});

// import { Request, Response } from "express";
// import { mock } from "jest-mock-extended";
// //import '@types/jest';
// import jest from "jest";
// import OtpModel, { OtpDocument } from "../models/otpModel";
// import { generateOtp, verifyOtp } from "../controllers/otpController";

// jest.mock("../models/otpModel");

// describe("OTP Controller Tests", () => {
//   afterEach(() => {
//     jest.resetAllMocks();
//   });

//   describe("generateOtp", () => {
//     it("should generate and send OTP successfully", async () => {
//       const req: Request = { body: { identifier: "1234567890" } } as Request;
//       const res: Response = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce(null);

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
//         send: sendMock,
//         status: jest.fn(),
//       }));

//       await generateOtp(req, res);

//       expect(statusMock).toHaveBeenCalledWith(200);
//       expect(sendMock).toHaveBeenCalledWith({
//         message: "OTP sent successfully",
//         success: true,
//       });
//     });

//     it("should handle locked user and return an error message", async () => {
//       const req: Request = { body: { identifier: "lockedUser" } } as Request;
//       const res: Response = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
//         identifier: "lockedUser",
//         lockoutUntil: new Date(Date.now() + 10 * 60 * 1000), // Lockout for 10 minutes
//       });

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
//         send: sendMock,
//         status: jest.fn(),
//       }));

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
//       const req: Request = { body: { identifier: "1234567890", userEnteredOTP: "123456" } } as Request;
//       const res: Response = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
//         identifier: "1234567890",
//         passwords: [{ code: "123456", verified: false }],
//         failedAttempts: 0,
//       });

//       const saveMock = jest.fn();
//       OtpModel.prototype.save = saveMock;

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
//         send: sendMock,
//         status: jest.fn(),
//       }));

//       await verifyOtp(req, res);

//       expect(saveMock).toHaveBeenCalled();
//       expect(statusMock).toHaveBeenCalledWith(200);
//       expect(sendMock).toHaveBeenCalledWith({
//         success: true,
//         message: "OTP verified successfully",
//       });
//     });

//     it("should handle invalid OTP and return an error message", async () => {
//       const req: Request = { body: { identifier: "1234567890", userEnteredOTP: "654321" } } as Request;
//       const res: Response = {} as Response;

//       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce({
//         identifier: "1234567890",
//         passwords: [{ code: "123456", verified: false }],
//         failedAttempts: 0,
//       });

//       const saveMock = jest.fn();
//       OtpModel.prototype.save = saveMock;

//       const sendMock: jest.Mock = jest.fn();
//       const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
//         send: sendMock,
//         status: jest.fn(),
//       }));

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

// // import { Request, Response } from "express";
// // import '@types/jest';
// // import { mock } from "jest-mock-extended";
// // import OtpModel, { OtpDocument } from "../models/otpModel";
// // import { generateOtp, verifyOtp } from "../controllers/otpController";
// // import jestConfig from "../jest.config";


// // jestConfig.mock("../models/otpModel");

// // describe("OTP Controller Tests", () => {
// //   afterEach(() => {
// //     jest.resetAllMocks();
// //   });

// //   describe("generateOtp", () => {
// //     it("should generate and send OTP successfully", async () => {
// //       const req: Request = { body: { identifier: "1234567890" } } as Request;
// //       const res: Response = {} as Response;

// //       // OtpModel.findOne.mockResolvedValueOnce(Promise.resolve(null));
// //       // OtpModel.findOne.mockResolvedValueOnce(Promise.resolve(null));
// //       (OtpModel.findOne as jest.Mock).mockResolvedValueOnce(Promise.resolve(null));



// //       // const sendMock = jest.fn();
// //       // const statusMock = jest.fn(() => ({ send: sendMock }));
// //       // return res.status = statusMock;
// //      const sendMock: jest.Mock = jest.fn();
// //      const statusMock: jest.Mock = jest.fn().mockImplementation((code: number) => ({
// //      send: sendMock,
// //      status: (statusCode: number) => ({
// //      send: sendMock,
// //      status: jest.fn(),
// //     // Add other necessary methods from the Response type
// //   }),
// //   // Add other necessary methods from the Response type
// // })) as jest.Mock<Response<any, Record<string, any>>>;

// //       await generateOtp(req, res);

// //       expect(statusMock).toHaveBeenCalledWith(200);
// //       expect(sendMock).toHaveBeenCalledWith({
// //         message: "OTP sent successfully",
// //         success: true,
// //       });
// //     });

// //     // Add more test cases for different scenarios
// //   });

// //   describe("verifyOtp", () => {
// //     it("should verify OTP successfully", async () => {
// //       const req: Request = { body: { identifier: "1234567890", userEnteredOTP: "123456" } } as Request;
// //       const res: Response = {} as Response;

// //       const findOneMock = jest.fn();
// //       findOneMock.mockResolvedValueOnce({
// //         identifier: "1234567890",
// //         passwords: [{ code: "123456", verified: false }],
// //         failedAttempts: 0,
// //       });
// //       OtpModel.findOne = findOneMock;

// //       const saveMock = jest.fn();
// //       OtpModel.prototype.save = saveMock;

// //       // const statusMock = jest.fn(() => ({ send: jest.fn() }));
// //       // res.status = statusMock;

// //       const sendMock: jest.Mock = jest.fn();
// //       const statusMock: jest.Mock = jest.fn(() => ({ send: sendMock }));


// //       await verifyOtp(req, res);

// //       expect(saveMock).toHaveBeenCalled();
// //       // Add more expectations based on your implementation
// //     });

// //     // Add more test cases for different scenarios
// //   });
// // });
