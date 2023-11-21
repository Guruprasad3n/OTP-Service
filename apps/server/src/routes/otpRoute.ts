import { generateOtp, verifyOtp } from "../controllers/otpController";
import otpLimitMiddleware from "../middlewares/otpLimitMiddleware";
import express, { Router } from "express";


const router: Router = express.Router();
router.post("/generate", otpLimitMiddleware, generateOtp);
router.post("/verify", verifyOtp);

export default router;
