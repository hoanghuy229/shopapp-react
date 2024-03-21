import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetail, login } from "../../api/UserApi";
import { LoginDTO } from "../../dtos/users/LoginDTO";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");
    const [rememberme,setRememberme] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const handleRememberMeChange = () => {
        setRememberme(!rememberme);
    }

    const handleLogin = async () => {
        const loginDTO = {
            phone_number: phoneNumber,
            password: password,
        };
    
        try {
            const response = await login(loginDTO);
            if (response.includes("Invalid username or password")) {
                setError("Invalid username or password!");
            } else {
                const token = response;
                localStorage.setItem("token", token);
    
                getUserDetail(token).then((userResponse) => {
                    localStorage.setItem("user", JSON.stringify(userResponse));
                    const { role } = userResponse; //lấy trường role trong userResponse
                    if (role && role.id === 1) {
                        navigate("/dashboard"); //vào admin
                    } else {
                        navigate("/");//vào trang chủ
                    }
                });
            }
        } catch (error) {
            setError("Invalid username or password!");
        }
    };
    

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="login-form mx-auto">
                        <h2 className="login-header" style={{textAlign:"center",margin:"30px"}}>Đăng nhập</h2>
                        <form >
                        <div className="form-group">
                            <label >Phone</label>
                            <input type="text" className="form-control" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                            <div className="divider-nospace"></div>
                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group password-field">
                            <label >Mật khẩu</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group">
                            <div className="form-check checkbox-text">
                            <span style={{display:"flex"}}>
                                <input type="checkbox" className="form-check-input" name="remember" checked={rememberme} onChange={handleRememberMeChange}/>
                                <label className="form-check-label text-start">Ghi nhớ đăng nhập</label>
                            </span>
                            </div>
                        </div>
                        <div className="form-group">
                        <div className="mt-3"></div>
                            <a href="/forgetPassword" className="register-link">Quên mật khẩu</a>
                        <button type="button" className="login-button btn btn-outline-success " style={{marginLeft:"160px"}} onClick={handleLogin}>Đăng nhập</button>
                        <div className="divider"></div>
                        </div>
                        <div className="mt-3"></div>
                        <p className="text-center">Bạn chưa đăng ký? <span>
                            <Link to="/register" className="register-link">Tạo tài khoản</Link></span></p>
                        </form>
                        </div>
                        {
                        error && (<p style={{color:'red'}}>{error}</p>)
                        }   
                </div>
            </div>
    </div>
    );
}