import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as apiMethods from './orderApi'
const initialState = {
  orderDate: null,
  desiredDeliveryDate: null,
  cart: [],
  orders: [],
  order: null,
  loading: 'idle',
  error: null,
};


export const getAllOrders = createAsyncThunk(
    'fetchAllorders',
    async (thunkAPI) => {
        const res = await apiMethods.get_Orders()
        return res
    },
)

export const getByIdOrder = createAsyncThunk(
    'getbyidorder',
    async (id, thunkAPI) => {
        const res = await apiMethods.getById_Order(id)
        return res
    },
)


export const addOrder = createAsyncThunk(
    'addOrder',
    async (newOrder, thunkAPI) => {
        const res = await apiMethods.add_Order(newOrder)
        return res
    },
)

export const deleteOrder = createAsyncThunk(
    'deleteorder',
    async (id, thunkAPI) => {
        const res = await apiMethods.delete_Order(id)
        return res
    },
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductsToCart: (state, action) => {
      const product = action.payload.product;
      const qty = action.payload.quantities;
      const index = state.cart.findIndex(item => item[0].product.id === product.id);
      if (index === -1) {
          state.cart = [...state.cart, [{ product, qty }]];
      } else {
          state.cart[index][0].qty += parseInt(qty, 10);
      }
    },
    updateOrderDetails: (state, action) => {
      const id = action.payload.id;
      const qty = action.payload.qty;
      let index = state.cart.findIndex(x => x[0].product.id === id);
      if (index !== -1) {
          state.cart[index][0].qty = parseInt(qty, 10); 
      }
  },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(x => x[0].product.id != action.payload)

   },
   

   },


   

  extraReducers: (builder) => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getByIdOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.cart = [];
    });
    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter((x) => x.id !== action.payload);
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});


export const { addProductsToCart, removeFromCart, updateOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;