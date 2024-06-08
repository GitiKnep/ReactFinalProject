import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as apiMethods from './userApi'
const initialState = {
    users: [],
    currentUser: null,
    loading: 'idle',
    error: null,
  };
export const getUsers = createAsyncThunk(
    'get',
    async (id, thunkAPI) => {
        const res = await apiMethods.get_Users(id)
        return res
    },
)
export const addUser = createAsyncThunk(
    'add',
    async (newUser, thunkAPI) => {
        const res = await apiMethods.add_User(newUser)
        return res
    },
)
export const loginUser = createAsyncThunk(
    'login',
    async (user, thunkAPI) => {
        const res = await apiMethods.login_User(user)
        return res
        
    },
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      logout: (state) => {
        state.currentUser = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(addUser.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.currentUser= {id:action.payload.newId, ...action.meta.arg};
         
        })
        .addCase(addUser.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.error.message;
        })       
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.currentUser = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.error.message;
        })
        .addCase(getUsers.fulfilled, (state, action) => {
          state.loading = 'idle';
          state.users = action.payload;
        })
        .addCase(getUsers.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = action.error.message;
        });
     
    },
  });
  
  export const { logout } = userSlice.actions;
  
  export default userSlice.reducer;
