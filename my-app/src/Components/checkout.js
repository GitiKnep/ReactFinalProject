// Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { addOrder } from './features/order/orderSlice';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackImage from '../images/background.png'; 

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, error } = useSelector((state) => state.orders);
  const { currentUser } = useSelector((state) => state.users);
  const totalPrice = new URLSearchParams(location.search).get('totalPrice');

  const [formData, setFormData] = useState({
    city: currentUser?.city || '',
    street: currentUser?.street || '',
    house: currentUser?.house || ''
  });
  const [orderDate, setOrderDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    setOrderDate(format(today, 'dd-MM-yyyy'));
    setDueDate(format(nextWeek, 'dd-MM-yyyy'));
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newOrder = {
      orderDate,
      dueDate,
      idUser: currentUser.id,
      city: formData.city,
      street: formData.street,
      house: formData.house,
      cart: cart
    };
    dispatch(addOrder(newOrder)).then(() => {
      toast.success('Your order has been saved', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: purple[50],
          color: purple[700]
        }
      });
      setTimeout(() => {
        navigate('/orderList');
      }, 2000);
    });
  };

  return (
    <body style={{ background: `url(${BackImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }}>
      <Box sx={{ padding: 3, backgroundColor: purple[50], borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" component="div" sx={{ marginBottom: 3, color: purple[700], textAlign: 'center' }}>
          Checkout
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2, color: purple[600], textAlign: 'center' }}>
          {currentUser?.firstName} {currentUser?.lastName}
        </Typography>
        <Typography variant="h6" component="div" sx={{ marginBottom: 2, color: purple[600], textAlign: 'center' }}>
          Total Price: ${totalPrice}
        </Typography>
        <form noValidate onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="House"
            name="house"
            value={formData.house}
            onChange={handleInputChange}
            fullWidth
            required
            variant="outlined"
          />
          <TextField
            label="Order Date"
            name="orderDate"
            value={orderDate}
            fullWidth
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Desired Delivery Date"
            name="dueDate"
            value={dueDate}
            fullWidth
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type='submit' variant="contained" sx={{ backgroundColor: purple[500], color: 'white' }}>
            Place Order
          </Button>
        </form>
      </Box>
      <ToastContainer />
    </body>
  );
};

export default Checkout;
