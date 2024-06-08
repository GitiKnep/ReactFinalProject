import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getByIdProduct, updateProduct, addProduct } from './features/product/productSlice';
import { Box, TextField, Button } from '@mui/material';
import { purple } from '@mui/material/colors';
import BackImage from '../images/background.png'; 


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imgUrl: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(getByIdProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product && id) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imgUrl: product.imgUrl
      });
    }
  }, [product, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateProduct({ id, product: formData }));
    } else {
      dispatch(addProduct(formData));
    }
    navigate('/productList');
  };

  if (loading === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <body style={{ background: `url(${BackImage}) no-repeat center center fixed`, backgroundSize: 'cover', minHeight: '100vh', alignItems: 'center' }}>
    <Box sx={{ padding: 2}}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <TextField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <TextField
          label="Image URL"
          name="imgUrl"
          value={formData.imgUrl}
          onChange={handleChange}
          fullWidth
          sx={{ marginBottom: 2, backgroundColor: 'white', borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: purple[500], color: 'white' }}
        >
          {id ? 'Update Product' : 'Add Product'}
        </Button>
      </form>
    </Box>
    </body>
  );
};

export default ProductDetails;
