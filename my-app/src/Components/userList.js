import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { purple } from '@mui/material/colors';
import { getUsers } from './features/user/userSlice';
import BackImage from '../images/background.png'; 

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <body style={{ background: `url(${BackImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }}>
    <Box sx={{ padding: 2}}>
      <Typography variant="h4" component="div" sx={{ marginBottom: 2, color: purple[700] }}>
        User Management
      </Typography>
      {loading === 'loading' ? (
        <Typography variant="h6" component="div" sx={{ color: purple[700] }}>
          Loading...
        </Typography>
      ) : error ? (
        <Typography variant="h6" component="div" sx={{ color: 'red' }}>
          {error}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
    </body>
  );
};

export default UserList;
