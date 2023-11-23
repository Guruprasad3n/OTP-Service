import {  Document } from 'mongoose';
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