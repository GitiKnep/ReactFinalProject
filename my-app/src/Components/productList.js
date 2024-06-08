import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProduct } from './features/product/productSlice';
import { addProductsToCart } from './features/order/orderSlice';
import { Box, Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';
import { AddShoppingCart } from '@mui/icons-material';
import Cart from './cart';
import MiniCart from './miniCart';  
import { useNavigate } from 'react-router-dom';
import BackImage from '../images/background.png'; 


const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const { currentUser } = useSelector((state) => state.users); 
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({ name: '', minPrice: '', maxPrice: '' });
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [openCartDialog, setOpenCartDialog] = useState(false);
  const [openMiniCartDialog, setOpenMiniCartDialog] = useState(false);  
  const [quantities, setQuantities] = useState(1);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const adminEmail = 'efrat@gmail.com';
  const isAdmin = currentUser?.email === adminEmail;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete.id);
      setOpenDeleteDialog(false);
    }
  };

  const handleDeleteProduct = useCallback((id) => {
    dispatch(deleteProduct(id)).then(() => {
      setFilteredProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    });
  }, [dispatch]);

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setProductToDelete(null);
  };

  const applyFilters = () => {
    let filtered = products;
    if (filter.name) {
      filtered = filtered.filter((product) => product.name.toLowerCase().includes(filter.name.toLowerCase()));
    }
    if (filter.minPrice) {
      filtered = filtered.filter((product) => product.price >= parseFloat(filter.minPrice));
    }
    if (filter.maxPrice) {
      filtered = filtered.filter((product) => product.price <= parseFloat(filter.maxPrice));
    }
    setFilteredProducts(filtered);
    setOpenFilterDialog(false);
  };

  const handleQuantityChange = (value) => {
    console.log("value", value);
    setQuantities(value);
  };

  const handleAddToCart = (product) => {
    dispatch(addProductsToCart({ product, quantities }));
    setOpenMiniCartDialog(true);  
  };

  if (loading === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box style={{ background: `url(${BackImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }} sx={{ padding: 2, backgroundColor: purple[50] }}>
      <Button onClick={() => setOpenFilterDialog(true)} sx={{ marginBottom: 2, backgroundColor: purple[500], color: 'white' }}>Filter Products</Button>

      <Grid container spacing={1} >
        {filteredProducts.map((product) => (
          <Grid item xs={6} sm={4} md={2} key={product.id}>
            <Card sx={{ backgroundColor: purple[100], transform: 'scale(0.9)', marginBottom: 2, height: '350px', display: 'flex', flexDirection: 'column' }}> 
              <CardMedia
                component="img"
                height="50%"
                image={product.imgUrl}
                alt={product.name}
                sx={{ objectFit: 'fill' }} 
              />
              <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" component="div">{product.name}</Typography>
                <Typography variant="body2" color="text.secondary">{product.description}</Typography>
                <Typography variant="body1" color="text.primary">Price: ${product.price}</Typography>
                <Box sx={{ marginTop: 'auto', display: 'flex', alignItems: 'center' }}>
                  {isAdmin ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/ProductDetails/${product.id}`)}
                        sx={{ flex: 0.5, backgroundColor: purple[500], color: 'white', marginRight: 1 }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteClick(product)}
                        sx={{ flex: 0.5, backgroundColor: purple[500], color: 'white' }}
                      >
                        Delete
                      </Button>
                      <Dialog open={openDeleteDialog} onClose={cancelDelete}>
                        <DialogTitle>Confirm Delete</DialogTitle>
                        <DialogContent>Are you sure you want to delete this product?</DialogContent>
                        <DialogActions>
                          <Button onClick={cancelDelete} sx={{ color: purple[500] }}>Cancel</Button>
                          <Button onClick={confirmDelete} sx={{ backgroundColor: purple[500], color: 'white' }}>Delete</Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  ) : (
                    <>
                      <TextField
                        type="number"
                        defaultValue={1}
                        InputProps={{ inputProps: { min: 1 } }}
                        sx={{flex: 0.5, marginRight: 1, backgroundColor: 'white', borderRadius: 1 }}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                      />
                      <Button
                        variant="contained"
                        sx={{ flex: 0.5, backgroundColor: purple[500], color: 'white' }}
                        startIcon={<AddShoppingCart />}
                        onClick={() => handleAddToCart(product)}
                      >
              
                      </Button>
                    </>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openFilterDialog} onClose={() => setOpenFilterDialog(false)}>
        <DialogTitle>Filter Products</DialogTitle>
        <DialogContent>
          <TextField label="Filter by Name" name="name" value={filter.name} onChange={handleFilterChange} sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }} />
          <TextField label="Min Price" name="minPrice" value={filter.minPrice} onChange={handleFilterChange} type="number" sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }} />
          <TextField label="Max Price" name="maxPrice" value={filter.maxPrice} onChange={handleFilterChange} type="number" sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={applyFilters} sx={{ backgroundColor: purple[500], color: 'white' }}>Apply Filters</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openCartDialog} onClose={() => setOpenCartDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Shopping Cart</DialogTitle>
        <DialogContent>
          <Cart />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCartDialog(false)} sx={{ backgroundColor: purple[500], color: 'white' }}>Close</Button>
        </DialogActions>
      </Dialog>

      <MiniCart open={openMiniCartDialog} onClose={() => setOpenMiniCartDialog(false)} /> 
    </Box>
  );
};

export default ProductList;
