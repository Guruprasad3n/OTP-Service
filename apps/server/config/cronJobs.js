const cron = require('node-cron');
const { cleanupDatabase } = require('../controllers/otpController');

// Schedule the cleanup function to run every day at 12:00 am
const databaseCleaner = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running database cleanup...');
    await cleanupDatabase();
  });
};

module.exports = databaseCleaner;
