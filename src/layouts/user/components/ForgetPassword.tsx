import React, { useState } from "react";
import { forgetPassword } from "../../../api/UserApi";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
    const [phoneNumber,setPhoneNumber] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleSubmitPhoneNumber = async () =>{
        const response = await forgetPassword(phoneNumber);
        if(!response.includes("success")){
            setError("kiểm tra lại số điện thoại");
        }
        else{
            navigate(`/validOtp/${phoneNumber}`);
        }
    }

    return (
        <div className="container mt-5">
                <h1 style={{textAlign:"center"}}> forget password </h1>
                    <h5>
                    {
                        error && (<p style={{textAlign:"center",color:"red"}}>{error}</p>)
                    }
                    </h5>
                    
                    <div className="row justify-content-center mt-5">
                            <strong className="col-2">Phone Number:</strong>
                            <input 
                                className="form-control col" 
                                value={phoneNumber} 
                                placeholder="Phone Number" 
                                style={{maxWidth:"200px"}}
                                onChange={(e) => setPhoneNumber(e.target.value)} required
                               />
                    </div> 
                    
                    <div className="d-flex justify-content-center align-center" style={{ margin: "50px" }}>
                        <button className="btn btn-outline-success" onClick={handleSubmitPhoneNumber} style={{ width: "100px", height: "50px", marginRight: "100px" }}>
                           xác nhận
                        </button>
                        <a href="/login">
                        <button 
                            type="submit"
                            className="btn btn-outline-warning" 
                            style={{ width: "100px", height: "50px" }}>
                                quay lại
                        </button>
                        </a>
                    </div>
        </div>
    );
}