import OtpModel from "../models/otpModel";

const cleanupDatabase = async (): Promise<void> => {
  try {
    const result = await OtpModel.updateMany(
      { "passwords.expiresAt": { $lt: new Date() } },
      { $pull: { passwords: { expiresAt: { $lt: new Date() } } } },
      { multi: true }
    );

    // console.log(`Cleanup successful. Deleted ${result.nModified} records.`);
  } catch (error) {
    console.error("Error during database cleanup:", error);
  }
};

export default cleanupDatabase;
