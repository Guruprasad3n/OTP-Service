import mongoose, { ConnectOptions, Mongoose } from "mongoose";

mongoose.set("bufferCommands", false);
mongoose.set("bufferTimeoutMS", 30000);
// || "mongodb://127.0.0.1:27017/verification"
const connectDB = async (): Promise<void> => {
  try {
    const connection: Mongoose = await mongoose.connect(
      process.env.MONGO_URL || "mongodb://127.0.0.1:27017/verification" as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("Database Connected");
  } catch (e) {
    console.log(`Error in MongoDB ${e}`);
  }
};

export default connectDB;
