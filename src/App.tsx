import React from 'react';
import './App.css';
import { Footer } from './layouts/header-footer/Footer';
import { HomePage } from './layouts/home/HomePage';
import { ProductDetail } from './layouts/product/ProductDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './layouts/user/Login';
import { Register } from './layouts/user/Register';
import { AuthLayout } from './layouts/authLayout/AuthLayout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          {/* with header */}
        <Route element={<AuthLayout />}>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/product/:productId' element={<ProductDetail></ProductDetail>}></Route>
        </Route>

          {/* without header */}
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>

        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
