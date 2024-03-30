import React from "react";
import { Link } from "react-router-dom";

export function Footer(){
    return(
        <div className="footer mt-5">
        <footer className="text-center text-lg-start bg-dark text-muted ">
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-white">
            <div className="me-5 d-none d-lg-block text-white">
              <span>Get connected with us on social networks:</span>
            </div>
  
            <div >
              <a href="" className="me-4 text-reset">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-google"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="" className="me-4 text-reset">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </section>
  
          <section className="text-white">
            <div className="container text-center text-md-start mt-5">
              <div className="row mt-3">
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <Link to={'/'} style={{textDecoration:"none",color:"white"}}>
                    <h6 className="text-uppercase fw-bold mb-4">
                      <i className="fas fa-gem me-3" ></i>Home Page
                    </h6>
                  </Link>
                 
                </div>
  
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      Post Man
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      React
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      Spring boot
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      MySQL
                    </a>
                  </p>
                </div>
  
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      Pricing
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      Settings
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      Orders
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset text-decoration-none">
                      Help
                    </a>
                  </p>
                </div>
  
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i className="fas fa-home me-3"></i> New York, NY 10012, US
                  </p>
                  <p>
                    <i className="fas fa-envelope me-3"></i>
                    hoanghuy220903@gmail.com
                  </p>
                  <p>
                    <i className="fas fa-phone me-3"></i> + 01 234 567 88
                  </p>
                  <p>
                    <i className="fas fa-print me-3"></i> + 01 234 567 89
                  </p>
                </div>
              </div>
            </div>
          </section>
  
          <div className="text-center p-4 text-white">
            © 2024 Copyright:
            <a className="text-reset fw-bold" href="https://react.dev/">
              SHOPAPP-REACT.com
            </a>
          </div>
        </footer>
      </div>
    );
}