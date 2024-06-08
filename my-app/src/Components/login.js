import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Box, Grid, Paper, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { loginUser, addUser } from './features/user/userSlice';
import { purple } from '@mui/material/colors';
import BackgroundImage from '../images/background-image.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', password: '', city: '', street: '', house: '' });
  const { loading, error } = useSelector((state) => state.users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!isLogin) {
      if (!validatePhone(formData.phone)) {
        toast.error('Please enter a valid phone number');
        return;
      }

      const requiredFields = ['firstName', 'lastName', 'phone', 'city', 'street', 'house'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          toast.error(`Please enter a valid ${field}`);
          return;
        }
      }
    }

    if (!formData.password) {
      toast.error('Please enter a valid password');
      return;
    }

    if (isLogin) {
      const result = await dispatch(loginUser({ email: formData.email, password: formData.password }));
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/productList');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } else {
      const newUser = { ...formData };
      const result = await dispatch(addUser(newUser));

      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/productList');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ firstName: '', lastName: '', phone: '', email: '', password: '', city: '', street: '', house: '' });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container justifyContent="center" style={{ background: `url(${BackgroundImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }}>
      <ToastContainer />
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <Typography variant="h5" component="h2" gutterBottom color="primary" sx={{ color: purple[700], textAlign: 'center' }}>
            {isLogin ? 'Login' : 'Register'}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField  label="Email" variant="outlined" fullWidth name="email"  value={formData.email}  onChange={handleInputChange} margin="normal"  required />
            {!isLogin && (
              <>
                <TextField label="First Name" variant="outlined" fullWidth  name="firstName" value={formData.firstName}  onChange={handleInputChange} margin="normal" required/>
                <TextField  label="Last Name"  variant="outlined"  fullWidth  name="lastName"  value={formData.lastName} onChange={handleInputChange} margin="normal" required  />
                <TextField label="Phone" variant="outlined" fullWidth name="phone" value={formData.phone}  onChange={handleInputChange}  margin="normal"  required />
                <TextField label="City" variant="outlined" fullWidth name="city" value={formData.city} onChange={handleInputChange} margin="normal" required />
                <TextField label="Street" variant="outlined"  fullWidth  name="street"  value={formData.street}  onChange={handleInputChange}  margin="normal"  required/>
                <TextField label="House" variant="outlined"  fullWidth  name="house"  value={formData.house}  onChange={handleInputChange}  margin="normal"  required />
              </>
            )}
            <TextField label="Password"  variant="outlined" fullWidth  name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange}  margin="normal"  required  InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton  aria-label="toggle password visibility"  onClick={toggleShowPassword}  edge="end" >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            {error && <Typography color="error" sx={{ marginTop: 1, marginBottom: 2 }}>{error}</Typography>}
            <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading === 'loading'} sx={{ marginBottom: 2, backgroundColor: purple[700] }}>
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </form>
          <Typography variant="body2" align="center" color="primary" sx={{ color: purple[700], marginTop: 2 }}>
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <Link href="#" onClick={toggleMode} color="primary" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Register
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="#" onClick={toggleMode} color="primary" sx={{ cursor: 'pointer', fontWeight: 'bold' }}>
                  Login
                </Link>
              </>
            )}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
