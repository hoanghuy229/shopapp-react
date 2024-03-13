import React from 'react';
import './App.css';
import { Footer } from './layouts/header-footer/Footer';
import { Header } from './layouts/header-footer/Header';
import { HomePage } from './layouts/home/HomePage';
import { ProductDetail } from './layouts/product/ProductDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/product/:productId' element={<ProductDetail></ProductDetail>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
