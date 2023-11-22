// __tests__/otpController.test.ts
import { Request, Response } from 'express';
import { generateOtp, verifyOtp } from '../controllers/otpController';
import OtpModel, { OtpDocument } from '../models/otpModel';
import twilio from 'twilio';

jest.mock('twilio');

describe('generateOtp', () => {
  it('should generate and send OTP successfully', async () => {
    const req = { body: { identifier: 'testuser' } } as Request;
    const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

    OtpModel.findOne = jest.fn().mockReturnValue(null);
    OtpModel.findOneAndUpdate = jest.fn().mockReturnValue(null);

    await generateOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it('should handle user temporarily locked out', async () => {
    const req = { body: { identifier: 'lockeduser' } } as Request;
    const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

    OtpModel.findOne = jest.fn().mockReturnValue({ lockoutUntil: new Date(Date.now() + 10000) } as OtpDocument);

    await generateOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });

  it('should handle database error during OTP generation', async () => {
    const req = { body: { identifier: 'testuser' } } as Request;
    const res = { status: jest.fn(), send: jest.fn() } as unknown as Response;

    OtpModel.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

    await generateOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });

  // Add more test cases for other scenarios
});

describe('verifyOtp', () => {
  it('should verify OTP successfully', async () => {
    // Write a test case for successful OTP verification
  });

  it('should handle OTP not found', async () => {
    // Write a test case for OTP not found scenario
  });

  it('should handle expired OTP', async () => {
    // Write a test case for expired OTP scenario
  });

  // Add more test cases for other scenarios
});

