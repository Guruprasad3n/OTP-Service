import express, { Router } from 'express';
import OtpController  from '../controllers/otpController';
import otpLimitMiddleware from '../middlewares/otpLimitMiddleware';

class OtpRoute {
  public path = '/otp';
  public router: Router = express.Router();
  private otpController: OtpController = new OtpController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/generate', otpLimitMiddleware, this.otpController.generateOtp);
    this.router.post('/verify', this.otpController.verifyOtp);
  }
}

export default OtpRoute;









// import express, { Router } from 'express';
// import { generateOtp, verifyOtp } from '../controllers/otpController';
// import otpLimitMiddleware from '../middlewares/otpLimitMiddleware';

// class OtpRoute {
//   public path = '/otp';
//   public router: Router = express.Router();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.post('/generate', otpLimitMiddleware, generateOtp);
//     this.router.post('/verify', verifyOtp);
//   }
// }

// export default OtpRoute;

/////////////////////////////////////////////////////////////////////////////////////////////

// import { generateOtp, verifyOtp } from "../controllers/otpController";
// import otpLimitMiddleware from "../middlewares/otpLimitMiddleware";
// import express, { Router } from "express";


// const router: Router = express.Router();
// router.post("/generate", otpLimitMiddleware, generateOtp);
// router.post("/verify", verifyOtp);

// export default router;
