// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/login';
import ProductList from './Components/productList';
import ProductDetails from './Components/productDetails';
import NavBar from './Components/navBar';
import Cart from './Components/cart';
import Checkout from './Components/checkout';
import UserList from './Components/userList';
import OrderList from './Components/orderList';
import HostagesTicker from './Components/hostagesTicker';
import MyOrder from './Components/myOrder';

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path="productList" element={<ProductList />} />
          <Route path="/add-product" element={<ProductDetails />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/order/:orderId" element={<MyOrder />} />
          <Route path="/userList" element={<UserList />} />
        </Routes>
      </div>
      <HostagesTicker />
    </Router>
  );
}

export default App;
