import React from "react";
import { Link } from "react-router-dom";

export function Header(){
    return(
        <header>
  <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container">
          <a className="navbar-brand" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
                  <circle cx="50" cy="50" r="45" fill="rgb(240, 101, 197)"/>
                  <circle cx="50" cy="50" r="35" fill="rgb(127, 68, 255)"/>
              </svg>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                  <li className="nav-item">
                      <Link className="nav-link active" to="/" style={{color:'white'}}>Trang chủ</Link>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#" style={{color:'white'}}>Thông báo</a>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/cart" style={{color:'white'}}>
                          <i className="fas fa-shopping-cart icon"></i>
                          Giỏ hàng
                      </Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/login" style={{color:'white'}}>Đăng nhập</Link>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
</header>
    );
}