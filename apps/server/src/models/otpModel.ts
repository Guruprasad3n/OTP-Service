import { Schema, model, Document } from 'mongoose';

interface Password {
  code: number;
  expiresAt: Date;
  verified: boolean;
  requestedAt: Date;
  serviceProvider: string;
  serviceProviderResponse: any; // Adjust the type as needed
}

export interface OtpDocument extends Document {
  identifier: string;
  passwords: Password[];
  failedAttempts: number;
  lockoutUntil: Date | null;
}

const otpSchema = new Schema<OtpDocument>(
  {
    identifier: String,
    passwords: [
      {
        code: { type: Number },
        expiresAt: { type: Date },
        verified: { type: Boolean, default: false },
        requestedAt: { type: Date, default: Date.now },
        serviceProvider: { type: String },
        serviceProviderResponse: { type: Schema.Types.Mixed },
      },
    ],
    failedAttempts: { type: Number, default: 0 },
    lockoutUntil: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const OtpModel = model<OtpDocument>('OTP', otpSchema);

export default OtpModel;
