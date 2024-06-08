import { Delete } from '@mui/icons-material';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, TextField, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, updateOrderDetails } from './features/order/orderSlice';
import BackImage from '../images/background.png'; 


const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.orders);
  const { currentUser } = useSelector((state) => state.users);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (cart) {
      const initialQuantities = {};
      cart.forEach(item => {
        initialQuantities[item[0].product.id] = item[0].qty;
      });
      setQuantities(initialQuantities);
    }
  }, [cart]);

  const totalPrice = useMemo(() => {
    if (cart) {
      return cart.reduce((total, item) => {
        return total + (item[0].qty * item[0].product.price);
      }, 0);
    }
    return 0;
  }, [cart]);

  const handleQuantityChange = (id, value) => {
    const newQuantities = { ...quantities, [id]: value };
    setQuantities(newQuantities);
    submitQTY(id, value);
  };

  const submitQTY = (id, value) => {
    let qty = parseInt(value, 10);
    dispatch(updateOrderDetails({ id, qty }));
  };

  const handleRemoveProduct = (item) => {
    const product1 = item[0]?.product;
    if (product1) {
      dispatch(removeFromCart(product1.id));
    }
  };

  const handleCheckout = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate(`/checkout?totalPrice=${totalPrice}`);
    }
  };

  return (
    <body style={{ background: `url(${BackImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }}>
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" component="div" sx={{ marginBottom: 2, color: purple[700] }}>
        Hello, {currentUser?.firstName}
      </Typography>
      {cart && cart.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {cart.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ display: 'flex', backgroundColor: purple[100] }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={item[0]?.product?.imgUrl || ''}
                    alt={item[0]?.product?.name || 'Product Image'}
                  />
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                      {item[0]?.product?.name || 'Product Name'}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      Price: ${item[0]?.product?.price || 0}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                      <TextField
                        value={quantities[item[0].product.id] || 0}
                        onChange={(e) => handleQuantityChange(item[0]?.product?.id, e.target.value)}
                        type="number"
                        variant="outlined"
                        label="qty"
                        fullWidth
                        inputProps={{ min: 1 }}
                      />
                      <IconButton
                        onClick={() => handleRemoveProduct(item)}
                        sx={{ marginLeft: 'auto', color: purple[500] }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ marginTop: 2, textAlign: 'right' }}>
            <Typography variant="h6" color="text.primary">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            {cart.length > 0 && (
              <Button variant="contained" onClick={handleCheckout} sx={{ marginTop: 2, backgroundColor: purple[500], color: 'white' }}>
                Checkout
              </Button>
            )}
          </Box>
        </>
      ) : (
        <Typography variant="h6" component="div">
          Your cart is empty, Go to shopping!!!! 
        </Typography>
      )}
    </Box>
    </body>
  );
};

export default Cart;
