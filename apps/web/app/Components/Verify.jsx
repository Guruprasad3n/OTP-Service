import { useState } from 'react';
import axios from 'axios';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  const handleVerify = async () => {
    try {
      // Assuming you have the identifier (mobile number) stored in some way
      const identifier = 'user_mobile_number';

      const response = await axios.post('/api/verify', { identifier, otp });

      if (response.data.message === 'OTP verification successful') {
        setMessage('OTP verification successful');
      } else {
        setMessage('Invalid OTP, please try again');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setMessage('Internal server error. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <label>
        OTP:
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
      </label>
      <button onClick={handleVerify}>Verify</button>
      <p>{message}</p>
    </div>
  );
};

export default Verify;
