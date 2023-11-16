const express = require("express");
const { generateOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router()

router.post("/generate", generateOtp)
router.post("/verify", verifyOtp)





module.exports = router