import { Outlet } from "react-router-dom";
import { Header } from "../header-footer/Header";

export const AuthLayout = () => {//render component with header
    // ... perhaps some authentication logic to protect routes?
    return (
      <>
        <Header />
        <Outlet />

      </>
    );
  };