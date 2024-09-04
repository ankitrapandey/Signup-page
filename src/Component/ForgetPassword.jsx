import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const localStorageData = () => {
  const formData = localStorage.getItem('formdata');
  return formData ? JSON.parse(formData) : [];
};

const ForgetPassword = () => {
  const [formData, setFormData] = useState({ email: '', OTP: '', password: '', confirmPassword: '' });
  const [data, setData] = useState(localStorageData());
  const [matchOtp, setMatchOtp] = useState(false);
  const [matchPass, setMatchPass] = useState(false);
  const [generatedOTP, setGeneratedOTP] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * digits.length)];
    }
    console.log(`Generated OTP: ${OTP}`);
    setGeneratedOTP(OTP);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedEmail = data.find(item => item.email === formData.email);
    if (matchedEmail) {
      alert('Email matched.');
      setMatchOtp(true);
      generateOTP();
    } else {
      alert('Email not found.');
    }
  };

  const handleOtp = (e) => {
    e.preventDefault();
    if (formData.OTP === generatedOTP) {
      alert('OTP matched.');
      setMatchPass(true);
    } else {
      alert('OTP does not match.');
    }
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      alert('Passwords match.');
      const updatedData = data.map(item => 
        item.email === formData.email ? { ...item, password: formData.password } : item
      );
      setData(updatedData);
      localStorage.setItem('formdata', JSON.stringify(updatedData));
    } else {
      alert('Passwords do not match.');
    }
  };

  return (
    <div className='h-auto w-[40vw] mt-6'>
      <h1>Forget Password</h1>
      {!matchOtp && !matchPass && (
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              width: {
                xs: '100%',
                sm: '80%',
                md: '60%',
                lg: '40%'
              }
            }}
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
          <Button
            sx={{ width: '15vw', marginTop: "20px", marginLeft: "5px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      )}

      {matchOtp && !matchPass && (
        <form onSubmit={handleOtp}>
          <Typography variant="h6" component="h2" gutterBottom>
            Enter OTP
          </Typography>
          <TextField
            sx={{
              width: {
                xs: '100%',
                sm: '80%',
                md: '60%',
                lg: '40%'
              }
            }}
            label="OTP"
            variant="outlined"
            fullWidth
            margin="normal"
            name="OTP"
            value={formData.OTP}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ marginTop: '10px' }}
          >
            Match OTP
          </Button>
        </form>
      )}

      {matchPass && (
        <form onSubmit={handlePassword}>
          <Typography variant="h6" component="h2" gutterBottom>
            New Password
          </Typography>
          <TextField
            sx={{
              width: {
                xs: '100%',
                sm: '80%',
                md: '60%',
                lg: '40%'
              }
            }}
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Typography variant="h6" component="h2" gutterBottom>
            Confirm Password
          </Typography>
          <TextField
            sx={{
              width: {
                xs: '100%',
                sm: '80%',
                md: '60%',
                lg: '40%'
              }
            }}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            margin="normal"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: '10px' }}
          >
            Match Password
          </Button>
        </form>
      )}
    </div>
  );
};

export default ForgetPassword;
