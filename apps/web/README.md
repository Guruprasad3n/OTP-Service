# OTP Service React Frontend

This project represents the frontend part of an OTP (One-Time Password) service implemented using React. The frontend includes pages for user login and OTP verification.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/otp-service-frontend.git
   cd otp-service-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   Replace the `http://localhost:3000` with the URL of your backend API.

4. Start the development server:

   ```bash
   npm start
   ```

   The React app should be running at [http://localhost:3000](http://localhost:3000).

## Usage

### Login Page

The login page allows users to enter their mobile number to receive an OTP.

1. Enter your mobile number in the input field.
2. Click on the "Login" button.
3. Wait for the OTP to be sent.

### Verify Page

The verify page prompts users to enter the OTP received on their mobile number.

1. Enter the received OTP in the input field.
2. Click on the "Verify" button.
3. If the OTP is valid, the verification will succeed.

## Directory Structure

The project is organized with the following structure:

- **components:** Contains React components for login and OTP verification.
- **styles:** Includes CSS files for styling the components.
- **utils:** Contains utility functions used across components.
- **index.js:** Entry point for the React app.

## Components

### Login Component

The `Login` component handles user input for mobile number and initiates the OTP generation process.

### Verify Component

The `Verify` component handles OTP verification and provides options for resending the OTP.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests. Contributions are welcome!













# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
