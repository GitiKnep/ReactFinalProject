import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from './features/order/orderSlice';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
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

const OrderCard = styled(Paper)({
  padding: 20,
  backgroundColor: purple[100],
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  fontFamily: 'Arial, sans-serif',
});

const OrderDate = styled(Typography)({
  fontSize: 18,
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
});

const OrderDetails = styled(Typography)({
  fontSize: 14,
  color: '#555',
  marginTop: 5,
  fontFamily: 'Arial, sans-serif',
});

const OrderTotal = styled(Typography)({
  fontSize: 16,
  color: '#333',
  marginTop: 10,
  fontFamily: 'Arial, sans-serif',
});

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { currentUser } = useSelector((state) => state.users);

  const adminEmail = 'efrat@gmail.com';
  const isAdmin = currentUser?.email === adminEmail;

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleOpenDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredOrders = isAdmin ? orders : orders.filter(order => order.idUser === currentUser?.id);

  return (
    <body style={{ background: `url(${BackImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }}>
    <StyledBox>
      <Title variant="h4">Orders</Title>
      <Grid container spacing={3}>
        {filteredOrders.map((order) => {
          const totalAmount = order.cart.reduce((total, cartItem) => {
            return total + cartItem[0].product.price * cartItem[0].qty;
          }, 0);

          return (
            <Grid item xs={12} key={order.id} onClick={() => handleOpenDetails(order.id)}>
              <OrderCard elevation={3}>
                <OrderDate variant="h6">Order Date: {order.orderDate}</OrderDate>
                <OrderDetails variant="body2">Due Date: {order.dueDate}</OrderDetails>
                <OrderTotal variant="body1">Total Amount: ${totalAmount.toFixed(2)}</OrderTotal>
              </OrderCard>
            </Grid>
          );
        })}
      </Grid>
    </StyledBox>
    </body>
  );
};

export default OrderList;
