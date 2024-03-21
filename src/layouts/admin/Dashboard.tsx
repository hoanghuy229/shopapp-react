import React from "react";
import { useNavigate } from "react-router-dom";
import { UserResponse } from "../../responses/UserResponse";

export const Dashboard = () => {
    const navigate = useNavigate();


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


    return (
        <h1>admin ne</h1>
    );
}