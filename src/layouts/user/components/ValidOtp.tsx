import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { forgetPassword, validOtp } from "../../../api/UserApi";

export const ValidOtp = () => {
  const {phoneNumber} = useParams();
  const [error,setError] = useState("");
  const navigate =useNavigate();

  const [otp1,setOtp1] = useState("");
  const [otp2,setOtp2] = useState("");
  const [otp3,setOtp3] = useState("");
  const [otp4,setOtp4] = useState("");
  const [otp5,setOtp5] = useState("");
  const [otp6,setOtp6] = useState("");

  const handleOtp = async () => {
    const otpString = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    if(phoneNumber){
        const response = await validOtp(otpString,phoneNumber);
        if(!response.includes("success")){
            setError("OTP không đúng !!!");
        }
        else{
             // Chuyển hướng sang trang ResetPassword và truyền phoneNumber và otp
            navigate(`/resetPassword?phoneNumber=${phoneNumber}&otp=${otpString}`);
        }
    }
  }
  const reSendOtp = async () => {
    if(phoneNumber){
        const response = await forgetPassword(phoneNumber);
    }
  }

  return (
    <section className="container-fluid bg-body-tertiary d-block">
    <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4" style={{minWidth:"500px"}}>
            <div className="card bg-white mb-5 mt-5 border-0" style={{boxShadow: "0 12px 15px rgba(0, 0, 0, 0.02)"}}>
                <div className="card-body p-5 text-center">
                    <h4>Verify OTP</h4>
                    <p>Your code was sent to you Phone</p>
                    <h5>
                    {
                        error && (<p style={{textAlign:"center",color:"red"}}>{error}</p>)
                    }
                    </h5>
                    <div className="otp-field mb-4" style={{ display: 'flex'}}>
                        <input type="text" onChange={(e) => setOtp1(e.target.value)} className="form-control" style={{marginRight:"10px"}} maxLength={1}/>
                        <input type="text" onChange={(e) => setOtp2(e.target.value)} className="form-control" style={{marginRight:"10px"}} maxLength={1}/>
                        <input type="text" onChange={(e) => setOtp3(e.target.value)} className="form-control" style={{marginRight:"10px"}} maxLength={1}/>
                        <input type="text" onChange={(e) => setOtp4(e.target.value)} className="form-control" style={{marginRight:"10px"}} maxLength={1}/>
                        <input type="text" onChange={(e) => setOtp5(e.target.value)} className="form-control" style={{marginRight:"10px"}} maxLength={1}/>
                        <input type="text" onChange={(e) => setOtp6(e.target.value)} className="form-control" maxLength={1}/>
                    </div>


                    <button className="btn btn-primary mb-3" onClick={handleOtp}>
                        Verify
                    </button>

                    <p className="resend text-muted mb-0">
                        Didn't receive code? <a href="" onClick={reSendOtp}>Request again</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

  );
};

