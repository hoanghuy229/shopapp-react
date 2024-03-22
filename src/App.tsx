import React from 'react';
import './App.css';
import { HomePage } from './layouts/home/HomePage';
import { ProductDetail } from './layouts/product/ProductDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './layouts/user/Login';
import { Register } from './layouts/user/Register';
import { WithHeaderFooter } from './layouts/authLayout/WithHeader';
import { Cart } from './layouts/home/components/Cart';
import { OrderConfirm } from './layouts/home/components/OrderConfirm';
import { Profile } from './layouts/user/components/Profile';
import { OrderHistory } from './layouts/user/components/OrderHistory';
import { ForgetPassword } from './layouts/user/components/ForgetPassword';
import {ValidOtp} from './layouts/user/components/ValidOtp';
import { ResetPassword } from './layouts/user/components/ResetPassword';
import { Dashboard } from './layouts/admin/Dashboard';
import { WithFooter } from './layouts/authLayout/WithFooter';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* with header and footer */}
          <Route element={<WithHeaderFooter />}>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/product/:productId' element={<ProductDetail />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/orderConfirm' element={<OrderConfirm></OrderConfirm>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/orderHistory' element={<OrderHistory></OrderHistory>}></Route>
          </Route>

          {/* without header */}
          <Route element={<WithFooter></WithFooter>}>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/forgetPassword' element={<ForgetPassword></ForgetPassword>}></Route>
            <Route path='/validOtp/:phoneNumber' element={<ValidOtp></ValidOtp>}></Route>
            <Route path='/resetPassword' element={<ResetPassword />}></Route>
          </Route>

          {/* admin */}
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
