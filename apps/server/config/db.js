const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Detabase Connected");
  } catch (e) {
    console.log(`Error in MongoDB ${e}`);
  }
};
module.exports = connectDB;






















// import mongoose, { Connection } from "mongoose";

// // const connectDB = async (): Promise<Connection | void> => {
// //   try {
// //     const connection = await mongoose.connect(process.env.MONGO_URL);
// //     console.log("Database Connected");
// //     return connection;
// //   } catch (error) {
// //     console.error(`Error in MongoDB ${error}`);
// //   }
// // };

// // export default connectDB;


// import mongoose, { ConnectOptions, Mongoose } from "mongoose";

// const connectDB = async (): Promise<Mongoose | void> => {
//   try {
//     // const options: ConnectOptions = {
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     // };

//     const connection = await mongoose.connect(process.env.MONGO_URL || "");
//     console.log("Database Connected");
//     return connection;
//   } catch (error) {
//     console.error(`Error in MongoDB: ${error}`);
//   }
// };

// export default connectDB;
