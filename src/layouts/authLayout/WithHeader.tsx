import { Outlet } from "react-router-dom";
import { Header } from "../header-footer/Header";
import { Footer } from "../header-footer/Footer";

export const WithHeaderFooter = () => {//render component with header
    // ... perhaps some authentication logic to protect routes?
    return (
      <>
        <Header />
        <Outlet />
        <Footer/>
      </>
    );
  };