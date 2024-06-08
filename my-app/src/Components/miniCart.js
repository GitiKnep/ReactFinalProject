// MiniCart.js
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { purple } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';

const MiniCart = ({ open, onClose }) => {
  const { cart } = useSelector((state) => state.orders);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    navigate('/cart');
    onClose();
  };

  const totalPrice = cart.reduce((total, item) => total + (item[0].qty * item[0].product.price), 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: purple[500], color: 'white', textAlign: 'center' }}>
        Cart
        <IconButton aria-label="close" onClick={onClose} sx={{  position: 'absolute',  right: 8, top: 8,  color: 'white',  }} >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        <Grid container spacing={2}>
          {cart.map((item, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, border: `1px solid ${purple[200]}`, borderRadius: 1 }}>
                <img  src={item[0]?.product?.imgUrl || ''} alt={item[0]?.product?.name || 'Product Image'} style={{ width: '70px', height: '70px', marginRight: 16, borderRadius: 8 }}/>
                <Box>
                  <Typography variant="h6" color="text.primary" sx={{ fontWeight: 'bold' }}>
                    {item[0]?.product?.name || 'Product Name'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Price: ${item[0]?.product?.price || 0}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Quantity: {item[0]?.qty || 0}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', padding: 2 }}>
        <Typography variant="h6" color="text.primary" sx={{ marginRight: 'auto', fontWeight: 'bold' }}>
          Total Price: ${totalPrice.toFixed(2)}
        </Typography>
        <Button onClick={onClose} sx={{ marginRight: 2, backgroundColor: purple[500], color: 'white' }}>
          Continue Shopping
        </Button>
        <Button onClick={handleCheckoutClick} sx={{ backgroundColor: purple[500], color: 'white' }}>
          Proceed to Checkout
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MiniCart;
