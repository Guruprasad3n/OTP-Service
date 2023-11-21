const express = require('express');
const connectDB = require('./config/db');
const otpRouter = require('./routes/otpRoute');
const cors = require("cors")
require('./config/cronJobs')();
const dotenv = require('dotenv').config();

connectDB();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/otp', otpRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
