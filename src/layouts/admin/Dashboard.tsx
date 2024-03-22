import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserResponse } from "../../responses/UserResponse";
import { AllUser } from "./components/users/AllUser";
import { AllCategory } from "./components/categories/AllCategory";
import { AllProduct } from "./components/products/AllProduct";
import { AllOrder } from "./components/orders/AllOrder";

export const Dashboard = () => {
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);
    const [showComponents,setShowComponents] = useState("");

    const showView = (showView:string) => {
        setShowComponents(showView);
    }

    const handleMouseEnter = (itemName:any) => {
        setHoveredItem(itemName);
    };

    const handleMouseLeave = () => {
        setHoveredItem(null);
    };

    if(localStorage.getItem('token') == null ){
        alert("login!!!");
        navigate("/login");
        return(<h1>login!</h1>);
    }
    
    const userResponseJSON = localStorage.getItem('user');
    const userResponse:UserResponse = userResponseJSON? JSON.parse(userResponseJSON):null;
    const {role} = userResponse;
    if(role.id != 1){
        alert("login!!!");
        navigate("/login");
        return(<h1>not admin!</h1>);
    }

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
    }

    return (
        <div className="container-fluid" style={{paddingLeft:"0 ",paddingRight:"0 "}}>
            <header className="header text-white " style={{backgroundColor:"grey",padding:"10px"}}>
                <h1 className="header-title" style={{textAlign:"center"}}>Admin Dashboard</h1>
            </header>
            <div className="row">
                <nav className="col-md-3 col-lg-2 d-md-block sidebar" style={{backgroundColor:"#007bff",height:"100vh"}}>
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item" style={{marginBottom:"50px", backgroundColor: hoveredItem === "Orders" ? "rgba(255, 255, 255, 0.2)" : ""}}
                                onMouseEnter={() => handleMouseEnter("Orders")}
                                onMouseLeave={handleMouseLeave}
                                onClick={()=>showView('Orders')}>
                                <a className="nav-link" href="#" style={{color:"white",padding:"10px 15px",fontSize:"30px"}}>
                                    <i className="fab fa-first-order icon" style={{padding:"5px"}}></i>Orders
                                </a>
                            </li>
                            <li className="nav-item" style={{marginBottom:"50px", backgroundColor: hoveredItem === "Categories" ? "rgba(255, 255, 255, 0.2)" : ""}}
                                onMouseEnter={() => handleMouseEnter("Categories")}
                                onMouseLeave={handleMouseLeave}
                                onClick={()=>showView('Categories')}>
                                <a className="nav-link" href="#" style={{color:"white",padding:"10px 15px",fontSize:"30px"}}>
                                    <i className="fab fa-canadian-maple-leaf icon" style={{padding:"5px"}}></i>Categories
                                </a>
                            </li>
                            <li className="nav-item" style={{marginBottom:"50px", backgroundColor: hoveredItem === "Products" ? "rgba(255, 255, 255, 0.2)" : ""}}
                                onMouseEnter={() => handleMouseEnter("Products")}
                                onMouseLeave={handleMouseLeave}
                                onClick={()=>showView('Products')}>
                                <a className="nav-link" href="#" style={{color:"white",padding:"10px 15px",fontSize:"30px"}}>
                                    <i className="fab fa-codepen icon" style={{padding:"5px"}}></i>Products
                                </a>
                            </li>
                            <li className="nav-item" style={{marginBottom:"50px", backgroundColor: hoveredItem === "Users" ? "rgba(255, 255, 255, 0.2)" : ""}}
                                onMouseEnter={() => handleMouseEnter("Users")}
                                onMouseLeave={handleMouseLeave}
                                onClick={()=>showView('Users')}>
                                <a className="nav-link" href="#" style={{color:"white",padding:"10px 15px",fontSize:"30px"}}>
                                    <i className="fas fa-user icon" style={{padding:"10px"}}></i>Users
                                </a>
                            </li>
                            <li className="nav-item" style={{marginBottom:"50px", backgroundColor: hoveredItem === "Logout" ? "rgba(255, 255, 255, 0.2)" : ""}}
                                onMouseEnter={() => handleMouseEnter("Logout")}
                                onMouseLeave={handleMouseLeave}>
                                <button className="nav-link" onClick={handleLogOut} style={{color:"white",padding:"10px 15px",fontSize:"30px"}}>
                                    <i className="fas fa-sign-out-alt" style={{padding:"10px"}}></i>Log out
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                    {showComponents === 'Users' && <AllUser></AllUser>}
                    {showComponents === 'Products' && <AllProduct></AllProduct>}
                    {showComponents === 'Categories' && <AllCategory></AllCategory>}
                    {showComponents === 'Orders' && <AllOrder></AllOrder>}
                </main>
            </div>
        </div>
    );
}