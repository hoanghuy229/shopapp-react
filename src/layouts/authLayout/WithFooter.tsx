import { Outlet } from "react-router-dom";
import { Footer } from "../header-footer/Footer";

export const WithFooter = () => {//render component with footer
    // ... perhaps some authentication logic to protect routes?
    return (
      <>
        <Outlet />
        <Footer/>
      </>
    );
  };