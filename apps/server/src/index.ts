import express, { Express, Response, Request } from 'express';
import dotenv from 'dotenv';
import OtpRoute from './routes/otpRoute'; // Assuming you have a file named OtpRoute.ts for the class-based route
import connectDB from './configs/db';

dotenv.config();

class App {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.listen();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    connectDB();
  }

  private initializeRoutes() {
    const otpRoute = new OtpRoute();
    this.app.use('/api/otp', otpRoute.router);

    this.app.get('/', (req: Request, res: Response) => {
      res.send('Home');
    });

    this.app.get('/hi', (req: Request, res: Response) => {
      res.send('Hi Guru Prasad');
    });
  }

  private listen() {
    const PORT = process.env.PORT || 8000;
    this.app.listen(PORT, () => {
      console.log(`Server Running in http://localhost:${PORT}`);
    });
  }
}

new App();





// import express, { Express, Response, Request } from "express";
// import dotenv from "dotenv";
// import router from "./routes/otpRoute";
// import connectDB from "./configs/db";
// dotenv.config();
// const PORT = process.env.PORT || 8000;
// const app = express();
// connectDB()
// app.use(express.json());

// app.use("/api/otp", router);
// app.get("/", (req: Request, res: Response) => {
//   res.send("Home");
// });

// app.get("/hi", (req: Request, res: Response) => {
//   res.send("Hi Guru Prasad");
// });

// app.listen(PORT, () => {
//   console.log(`Server Running in http://localhost:${PORT}`);
// });
