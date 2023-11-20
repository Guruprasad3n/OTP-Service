const express = require("express");
const { generateOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router();

// Define your routes using the router
router.post("/generate-otp", generateOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;

// const express = require("express");
// const { generateOtp, verifyOtp } = require("../controllers/otpController");
// import express from("express");
// import { generateOtp, verifyOtp } from("../controllers/otpController");

// const router = express.Router()

// router.post("/generate", generateOtp)
// router.post("/verify", verifyOtp)
// module.exports = router
// export default router
