import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByIdOrder } from './features/order/orderSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/system';
import BackImage from '../images/background.png'; 


const StyledBox = styled(Box)({
  padding: 20,
  backgroundColor: purple[50],
  minHeight: '100vh',
  fontFamily: 'Arial, sans-serif',
});

const Title = styled(Typography)({
  marginBottom: 20,
  fontSize: 32,
  fontWeight: 'bold',
  color: purple[700],
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
});

const StyledButton = styled(Button)({
  marginBottom: 20,
  backgroundColor: purple[500],
  color: 'white',
  '&:hover': {
    backgroundColor: purple[700],
  },
  fontFamily: 'Arial, sans-serif',
});

const OrderCard = styled(Card)({
  marginBottom: 20,
  backgroundColor: purple[100],
  fontFamily: 'Arial, sans-serif',
});

const CartItemCard = styled(Card)({
  fontFamily: 'Arial, sans-serif',
});

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, loading, error } = useSelector((state) => state.orders);
  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    if (currentUser) {
      dispatch(getByIdOrder(orderId));
    }
  }, [dispatch, orderId, currentUser]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <body style={{ background: `url(${BackImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }}>
    <StyledBox>
      <StyledButton onClick={handleBack} startIcon={<ArrowBackIcon />}>
        Back to Orders
      </StyledButton>
      {order ? (
        <>
          <Title variant="h4">Order Details</Title>
          <OrderCard>
            <CardContent>
              <Typography variant="h6">Order Date: {order.orderDate}</Typography>
              <Typography variant="body2">Due Date: {order.dueDate}</Typography>
              <Typography variant="body1">City: {order.city}</Typography>
              <Typography variant="body1">Street: {order.street}, {order.house}</Typography>
            </CardContent>
          </OrderCard>
          <Typography variant="h5" sx={{ marginBottom: 2, fontFamily: 'Arial, sans-serif', color: purple[700] }}>Cart Items</Typography>
          <Grid container spacing={2}>
            {order.cart.map((cartItem, index) => (
              <Grid item xs={12} sm={6} md={2} key={index}>
                <CartItemCard>
                  <CardMedia
                    component="img"
                    height="140"
                    image={cartItem[0].product.imgUrl}
                    alt={cartItem[0].product.name}
                  />
                  <CardContent>
                    <Typography variant="body2">Product: {cartItem[0].product.name}</Typography>
                    <Typography variant="body2">Quantity: {cartItem[0].qty}</Typography>
                    <Typography variant="body2">Price: ${cartItem[0].product.price}</Typography>
                  </CardContent>
                </CartItemCard>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="body1" sx={{ fontFamily: 'Arial, sans-serif', color: purple[700] }}>No order details available.</Typography>
      )}
    </StyledBox>
    </body>
  );
};

export default OrderDetails;
