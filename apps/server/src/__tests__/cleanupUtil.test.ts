// __tests__/cleanupUtil.test.ts
import cleanupDatabase from '../utils/cleanupUtil';
import OtpModel from '../models/otpModel';

jest.mock('../models/otpModel');

describe('cleanupDatabase', () => {
  it('should clean up expired records successfully', async () => {
    OtpModel.updateMany = jest.fn().mockResolvedValue({ nModified: 5 });

    await cleanupDatabase();

    expect(OtpModel.updateMany).toHaveBeenCalledWith(
      { 'passwords.expiresAt': { $lt: expect.any(Date) } },
      { $pull: { passwords: { expiresAt: { $lt: expect.any(Date) } } } },
      { multi: true }
    );
  });

  it('should handle errors during cleanup', async () => {
    OtpModel.updateMany = jest.fn().mockRejectedValue(new Error('Cleanup error'));

    await cleanupDatabase();

    // Write assertions based on your error handling mechanism
  });

  // Add more test cases for other scenarios
});

