
# OTP Service

OTP Service is a Node.js application for generating and verifying one-time passwords (OTP) using Twilio SMS. It uses Express for the server, Mongoose for MongoDB integration, and includes rate limiting and database cleanup features.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/try/download/community) installed or a MongoDB Atlas account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/otp-service.git
   cd otp-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   MONGO_URL=mongodb://
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_MOBILE=your_twilio_phone_number
   ```

   Replace the values with your specific configuration.

4. Start the server:

   ```bash
   npm start
   ```

   The server should be running at http://localhost:3000.

## Usage

- **Generate OTP:**

  ```http
  POST /api/otp/generate
  ```

  Generate a new OTP. Requires a JSON body with the `identifier` (phone number).

- **Verify OTP:**

  ```http
  POST /api/otp/verify
  ```

  Verify the entered OTP. Requires a JSON body with `identifier` and `userEnteredOTP`.

- **Cleanup Database:**

  The database cleanup runs automatically every day at 12:00 am to remove expired OTP records.

## Directory Structure

- **controllers:** Contains the main logic for generating and verifying OTPs.
- **middlewares:** Includes rate-limiting middleware.
- **models:** Defines the Mongoose schema for OTPs.
- **routes:** Defines the Express routes.
- **utils:** Contains utility functions, including the database cleanup script.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## License

This project is licensed under the [Nolan Edutech Pvt. Ltd.](LICENSE).
