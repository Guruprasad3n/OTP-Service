import cron from "node-cron";
import cleanupDatabase from "../utils/cleanupUtil";

// Schedule the cleanup function to run every day at 12:00 am
const databaseCleaner = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running database cleanup...');
    await cleanupDatabase();
  });
};

export default databaseCleaner;
