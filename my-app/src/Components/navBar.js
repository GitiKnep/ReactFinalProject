import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Typography, Badge } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AccountCircle, ShoppingCart, Mail, Add, ListAlt, Group } from '@mui/icons-material';
import { purple } from '@mui/material/colors';
import { logout } from './features/user/userSlice';

const NavBar = () => {
  const { currentUser } = useSelector((state) => state.users);
  const { cart } = useSelector((state) => state.orders);
  const adminEmail = 'efrat@gmail.com';
  const isAdmin = currentUser?.email === adminEmail;
  const isUser = currentUser !== null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const logOUT = (currentUser) => {
    dispatch(logout(currentUser));
    totalUniqueItems = 0;
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const totalUniqueItems = cart.length;

  return (
    <Box>
      <AppBar position="fixed" sx={{ backgroundColor: purple[500] }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontFamily: 'CoolFont' }}>
            EduStation
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={Link} to="/productList">
              <ListAlt />
              <Typography variant="caption" display="block">Products</Typography>
            </Button>
            {isAdmin && (
              <>
                <Button color="inherit" component={Link} to="/add-product">
                  <Add />
                  <Typography variant="caption" display="block">Add Product</Typography>
                </Button>
                <Button color="inherit" component={Link} to="/orderList">
                  <Mail />
                  <Typography variant="caption" display="block">Orders</Typography>
                </Button>
                <Button color="inherit" component={Link} to="/userList">
                  <Group />
                  <Typography variant="caption" display="block">Users</Typography>
                </Button>
                <Button onClick={() => logOUT(currentUser)} color="inherit" component={Link} to="/login">
                  <AccountCircle />
                  <Typography variant="caption" display="block">Logout</Typography>
                </Button>
              </>
            )}
            {isUser && !isAdmin && (
              <>
                <Button color="inherit" component={Link} to="/orderList">
                  <Mail />
                  <Typography variant="caption" display="block">My Orders</Typography>
                </Button>
                <IconButton color="inherit" onClick={handleCartClick}>
                  <Badge badgeContent={totalUniqueItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                  <Typography variant="caption" display="block">Cart</Typography>
                </IconButton>
                <Button onClick={() => logOUT(currentUser)} color="inherit" component={Link} to="/login">
                  <AccountCircle />
                  <Typography variant="caption" display="block">Logout</Typography>
                </Button>
              </>
            )}
            {!isUser && (
              <>
                <IconButton color="inherit" onClick={handleCartClick}>
                  <Badge badgeContent={totalUniqueItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                  <Typography variant="caption" display="block">Cart</Typography>
                </IconButton>
                <Button color="inherit" component={Link} to="/login">
                  <AccountCircle />
                  <Typography variant="caption" display="block">Login/Signup</Typography>
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default NavBar;
