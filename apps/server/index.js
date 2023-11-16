const express = require("express");

const connectDB = require("./config/db");

const otpRouter = require("./routes/otpRoute");
const dotenv = require("dotenv").config();

connectDB();
const app = express();
const port = 3000;

app.use(express.json());





app.use("/api/otp", otpRouter)


app.listen(port, () => {
  // await connectDB
  console.log(`Server is running on port http://localhost:${port}`);
});
