import React from 'react';
import './App.css';
import { Footer } from './layouts/header-footer/Footer';
import { Header } from './layouts/header-footer/Header';
import { HomePage } from './layouts/home/HomePage';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <HomePage></HomePage>
      <Footer></Footer>
    </div>
  );
}

export default App;
