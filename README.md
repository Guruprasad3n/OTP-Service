# OTP Service - Web and Server

This project encompasses both the frontend (web) and backend (server) components of an OTP (One-Time Password) service. The web part is implemented using Turbo + Chkra-Ui, and the server part is built with Node.js, Express, typescript, twilio and MongoDB.

## Table of Contents

- [Web Installation](#web-installation)
- [Server Installation](#server-installation)
- [Usage](#usage)
- [Web Directory Structure](#web-directory-structure)
- [Server Directory Structure](#server-directory-structure)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Web Installation

1. Navigate to the web directory:

   ```bash
   cd otp-service-frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add the following environment variable:

   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   Replace the `http://localhost:3000` with the URL of your backend API.

4. Start the development server:

   ```bash
   pnpm start
   ```

   The React app should be running at [http://localhost:3000](http://localhost:3000).

## Server Installation

1. Navigate to the server directory:

   ```bash
   cd otp-service
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=3000
   MONGO_URL=mongodb://your_mongodb_url
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_MOBILE=your_twilio_phone_number
   ```

   Replace the values with your specific configuration.

4. Start the server:

   ```bash
   pnpm start
   ```

   The server should be running at [http://localhost:3000](http://localhost:3000).

## Usage

### Web

#### Login Page

The login page allows users to enter their mobile number to receive an OTP.

1. Enter your mobile number in the input field.
2. Click on the "Login" button.
3. Wait for the OTP to be sent.

#### Verify Page

The verify page prompts users to enter the OTP received on their mobile number.

1. Enter the received OTP in the input field.
2. Click on the "Verify" button.
3. If the OTP is valid, the verification will succeed.

### Server

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

## Web Directory Structure

The project is organized with the following structure:

- **components:** Contains React components for login and OTP verification.
- **styles:** Includes CSS files for styling the components.
- **utils:** Contains utility functions used across components.
- **index.js:** Entry point for the React app.

## Server Directory Structure

- **controllers:** Contains the main logic for generating and verifying OTPs.
- **middlewares:** Includes rate-limiting middleware.
- **models:** Defines the Mongoose schema for OTPs.
- **routes:** Defines the Express routes.
- **utils:** Contains utility functions, including the database cleanup script.

## Components

### Login Component

The `Login` component handles user input for mobile number and initiates the OTP generation process.

### Verify Component

The `Verify` component handles OTP verification and provides options for resending the OTP.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests.

## License


This project is licensed under the [Nolan Edutech Pvt. Ltd.](LICENSE).

