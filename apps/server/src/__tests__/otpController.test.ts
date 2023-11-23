import { Request, Response } from 'express';
import OtpController from "../controllers/otpController";
import OtpModel from '../models/otpModel';
import twilio from 'twilio';

jest.mock('twilio');

describe('OtpController', () => {
  it('should handle database error during OTP generation', async () => {
    const req = { body: { identifier: 'testuser' } } as Request;
    const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

    // Explicitly cast to jest.Mock to avoid TypeScript error
    (OtpModel.findOne as jest.Mock).mockRejectedValueOnce(new Error('Database error'));

    // Assuming the following line is how you instantiate your controller
    const otpController = new OtpController();

    // Call the method you want to test
    await otpController.generateOtp(req, res);

    // Add your assertions based on the behavior you expect
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });
  // it('should handle rate limit exceeded during OTP generation', async () => {
  //   // Mock locked user with lockoutUntil set
  //   const lockedUser = {
  //     identifier: 'lockeduser',
  //     lockoutUntil: new Date(Date.now() + 10000), // Some future time
  //   };
  //   OtpModel.findOne.mockResolvedValueOnce(lockedUser);

  //   const req = { body: { identifier: 'lockeduser' } } as Request;
  //   const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

  //   await otpController.generateOtp(req, res);

  //   expect(res.status).toHaveBeenCalledWith(400);
  //   expect(res.send).toHaveBeenCalledWith({
  //     success: false,
  //     error: 'Verification Limit Exceeded',
  //     message: expect.stringContaining('You have exceeded the maximum verification attempts'),
  //   });
  // });

  // it('should handle database error during OTP generation', async () => {
  //   const req = { body: { identifier: 'testuser' } } as Request;
  //   const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

  //   // Mock database error
  //   OtpModel.findOne.mockRejectedValueOnce(new Error('Database error'));

  //   await otpController.generateOtp(req, res);

  //   expect(res.status).toHaveBeenCalledWith(500);
  //   expect(res.send).toHaveBeenCalledWith({
  //     success: false,
  //     error: 'Internal server error',
  //     message: 'Database error',
  //   });
  // });

  // Add more test cases for verifyOtp, handleErrorResponse, and other scenarios as needed
});



// // __tests__/otpController.test.ts
// import { Request, Response } from 'express';
// import OtpController from '../controllers/otpController';
// import OtpModel from '../models/otpModel';
// import twilio from 'twilio';
// import { OtpDocument } from '@interfaces/otpInterface';

// jest.mock('twilio');

// describe('OtpController', () => {
//   let otpController: OtpController;
//   beforeEach(() => {
//     otpController = new OtpController();
//   });


//   describe('generateOtp', () => {
//     it('should generate and send OTP successfully', async () => {
//       const req = { body: { identifier: 'testuser' } } as Request;
//       const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

//       OtpModel.findOne = jest.fn().mockReturnValue(null);
//       OtpModel.findOneAndUpdate = jest.fn().mockReturnValue(null);

//       await otpController.generateOtp(req, res);

//       expect(res.status).toHaveBeenCalledWith(200);
//       expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
//     });

//     it('should handle user temporarily locked out', async () => {
//       const req = { body: { identifier: 'lockeduser' } } as Request;
//       const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

//       OtpModel.findOne = jest.fn().mockReturnValue({ lockoutUntil: new Date(Date.now() + 10000) } as OtpDocument);

//       await otpController.generateOtp(req, res);

//       expect(res.status).toHaveBeenCalledWith(400);
//       expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
//     });

//     it('should handle database error during OTP generation', async () => {
//       const req = { body: { identifier: 'testuser' } } as Request;
//       const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

//       OtpModel.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

//       await otpController.generateOtp(req, res);

//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
//     });

//     // Add more test cases for other scenarios
//   });

//   // describe('verifyOtp', () => {
//   //   it('should verify OTP successfully', async () => {
//   //     // Write a test case for successful OTP verification
//   //   });

//   //   it('should handle OTP not found', async () => {
//   //     // Write a test case for OTP not found scenario
//   //   });

//   //   it('should handle expired OTP', async () => {
//   //     // Write a test case for expired OTP scenario
//   //   });

//   //   // Add more test cases for other scenarios
//   // });
// });



//   it('should generate and send OTP successfully', async () => {
//     const req = { body: { identifier: 'testuser' } } as Request;
//     const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

//     OtpModel.findOne = jest.fn().mockReturnValue(null);
//     OtpModel.findOneAndUpdate = jest.fn().mockReturnValue(null);

//     await generateOtp(req, res);

//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
//   });

//   it('should handle user temporarily locked out', async () => {
//     const req = { body: { identifier: 'lockeduser' } } as Request;
//     const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

//     OtpModel.findOne = jest.fn().mockReturnValue({ lockoutUntil: new Date(Date.now() + 10000) } as OtpDocument);

//     await generateOtp(req, res);

//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
//   });

//   it('should handle database error during OTP generation', async () => {
//     const req = { body: { identifier: 'testuser' } } as Request;
//     const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

//     OtpModel.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

//     await generateOtp(req, res);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
//   });

//   // Add more test cases for other scenarios
// });

// describe('verifyOtp', () => {
//   it('should verify OTP successfully', async () => {
//     // Write a test case for successful OTP verification
//   });

//   it('should handle OTP not found', async () => {
//     // Write a test case for OTP not found scenario
//   });

//   it('should handle expired OTP', async () => {
//     // Write a test case for expired OTP scenario
//   });

//   // Add more test cases for other scenarios
// });

