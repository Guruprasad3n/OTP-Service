















// import { Schema, model, Document } from "mongoose";

// interface Password {
//   code: number;
//   requestedAt: Date;
//   expiresAt: Date;
//   verified: boolean;
//   serviceProvider?: string;
//   serviceProviderResponse?: any;
// }

// interface OtpDocument extends Document {
//   identifier: string;
//   passwords: Password[];
// }

// const otpSchema = new Schema<OtpDocument>({
//   identifier: String,
//   passwords: [
//     {
//       code: { type: Number },
//       requestedAt: { type: Date, default: Date.now },
//       expiresAt: { type: Date },
//       verified: { type: Boolean, default: false },
//       serviceProvider: { type: String },
//       serviceProviderResponse: { type: Schema.Types.Mixed },
//     },
//   ],
// }, {
//   timestamps: true,
// });

// const OtpModel = model<OtpDocument>("OTP", otpSchema);

// export default OtpModel;


