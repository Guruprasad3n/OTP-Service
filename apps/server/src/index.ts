import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import router from "./routes/otpRoute";
import connectDB from "./configs/db";
dotenv.config({ path: "/path/to/your/env/file" });
const PORT = process.env.PORT || 8000;
const app = express();
connectDB()
app.use(express.json());

app.use("/api/otp", router);
app.get("/", (req: Request, res: Response) => {
  res.send("Home");
});

app.get("/hi", (req: Request, res: Response) => {
  res.send("Hi Guru Prasad");
});

app.listen(PORT, () => {
  console.log(`Server Running in http://localhost:${PORT}`);
});
