import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import * as apiMethods from './productApi';

const initialState = {
  products: [],
  product: null,
  loading: 'idle',
  error: null,
};

export const getAllProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, thunkAPI) => {
    const res = await apiMethods.get_Products();
    return res;
  }
);

export const getByIdProduct = createAsyncThunk(
  'products/fetchById',
  async (id, thunkAPI) => {
    const res = await apiMethods.getById_Product(id);
    return res;
  }
);

export const addProduct = createAsyncThunk(
  'products/add',
  async (newProduct, thunkAPI) => {
    const res = await apiMethods.add_Product(newProduct);
    return res;
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, product }, thunkAPI) => {
    const res = await apiMethods.update_Product(id, product);
    return res;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    const res = await apiMethods.delete_Product(id);
    return res;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.product = null;
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(getAllProducts.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      // getByIdProduct
      .addCase(getByIdProduct.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(getByIdProduct.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.product = action.payload;
      })
      .addCase(getByIdProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      // addProduct
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      // updateProduct
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = 'idle';
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      })
      // deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.products = state.products.filter(x => x.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;
