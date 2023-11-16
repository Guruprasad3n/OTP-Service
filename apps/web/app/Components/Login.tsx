/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';

// Your component code
const GenerateOtp: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const handleGenerateOtp = async () => {
    try {
      // Send a request to your server to generate OTP
      const response = await fetch('/api/generate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: mobileNumber }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // Handle success, maybe show a success message
      } else {
        // Handle error, show an error message
        console.error('Failed to generate OTP');
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
    }
  };
  return (
    <div>
      <h2>Generate OTP</h2>
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button onClick={handleGenerateOtp}>Generate OTP</button>
    </div>
  );
};

export default GenerateOtp;