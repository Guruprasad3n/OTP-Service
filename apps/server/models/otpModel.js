// import { Schema, model, Document, Model } from 'mongoose';

// type ServiceProviderResponse = any;

// type Password = {
//   code: number;
//   requestedAt: Date;
//   expiresAt?: Date;
//   verified: boolean;
//   serviceProvider?: string;
//   serviceProviderResponse?: ServiceProviderResponse;
// };

// interface OtpDocument extends Document {
//   identifier: string;
//   passwords: Password[];
// }

// interface OtpModel extends Model<OtpDocument> {}

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

// const OtpModel: OtpModel = model<OtpDocument, OtpModel>("OTP", otpSchema);

// export default OtpModel;








const { Schema, model } = require("mongoose");

const otpSchema = new Schema({
  identifier: String,
  passwords: [
    {
      code: { type: Number },
      requestedAt: { type: Date, default: Date.now },
      expiresAt: { type: Date },
      verified: { type: Boolean, default:false },
      serviceProvider: { type: String },
      serviceProviderResponse: { type: Schema.Types.Mixed },
    },
  ],
},{
  timestamps: true,
});

const OtpModel = model("OTP", otpSchema);

module.exports = OtpModel;







