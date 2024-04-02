import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserDetail, login } from "../../api/UserApi";
import { LoginDTO } from "../../dtos/users/LoginDTO";
import { useNavigate } from "react-router-dom";
import { TokenResponse, useGoogleLogin  } from "@react-oauth/google";
import { GoogleGetInfo, GoogleLogin } from "../../api/SocialApi";
import { SocialAccountDTO } from "../../dtos/users/SocialAccountDTO";


export const Login = () => {
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");
    const [rememberme,setRememberme] = useState(false);
    const [error,setError] = useState("");
    const navigate = useNavigate();

    const [ GoogleUser, setGoogleUser ] = useState<Omit<TokenResponse, "error" | "error_description" | "error_uri"> | null>(null); // Fix type
    const [ Googleprofile, setGoogleProfile ] = useState([]);

    const handleRememberMeChange = () => {
        setRememberme(!rememberme);
    }

    const handleLogin = async () => {
        const loginDTO:LoginDTO = {
            phone_number: phoneNumber,
            password: password,
        };
    
        try {
            const response = await login(loginDTO);
            if (response.includes("invalid information !!!") || response.includes("role doesn't existed !!!") || response.includes("your account is banned !!!")) {
                setError(`${response}`);
            } else {
                const token = response;
                localStorage.setItem("token", token);
    
                getUserDetail(token).then((userResponse) => {
                    localStorage.setItem("user", JSON.stringify(userResponse));
                    const { role } = userResponse;
                    if (role && role.id === 1) {
                        navigate("/dashboard");
                    } else {
                        navigate("/");
                    }
                });
            }
        } catch (error) {
            setError("Invalid username or password!");
        }
    };

    const loginGoogle = useGoogleLogin({
        
        onSuccess: (codeResponse) => setGoogleUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    
    useEffect(
        () => {
            debugger
            if (GoogleUser && GoogleUser.access_token) { // Check if user exists and has access_token property
                GoogleGetInfo(GoogleUser.access_token)
                .then((data) => {
                    setGoogleProfile(data);
                    console.log(data); 

                    const socialAccountDTO:SocialAccountDTO = {
                        fullname:data.name,
                        google_account_id:data.id,
                        email:data.email,
                        role_id:2
                    }

                    GoogleLogin(socialAccountDTO)
                    .then(
                        response => {
                            if (response.includes("invalid information !!!") || response.includes("role doesn't existed !!!") || response.includes("your account is banned !!!")) {
                                setError(`${response}`);
                            } else {
                                const token = response;
                                localStorage.setItem("token", token);
                    
                                getUserDetail(token).then((userResponse) => {
                                    localStorage.setItem("user", JSON.stringify(userResponse));
                                    const { role } = userResponse;
                                    if (role && role.id === 1) {
                                        navigate("/dashboard");
                                    } else {
                                        navigate("/");
                                    }
                                });
                            }
                        }
                    )
                    .catch(error => console.log(error));
                }
                ).catch(error => 
                    console.log(error)
                );
            }
        },
        [ GoogleUser ]
    );
      
    return(
        <div className="container mt-5 d-flex justify-content-center">
            <div className="row">
                <div className="card p-1 mb-3" style={{width:"900px"}}>
                <div className="col-md-6 offset-md-3">
                    <div className="login-form mx-auto">
                        <h2 className="login-header" style={{textAlign:"center",margin:"30px"}}>Đăng nhập</h2>
                        {
                        error && (<p style={{color:'red'}}>{error}</p>)
                        }   
                        <form >
                        <div className="form-group">
                            <label >Phone</label>
                            <input type="text" className="form-control" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required/>
                            <div className="divider-nospace"></div>
                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group password-field">
                            <label >Mật khẩu</label>
                            <input type="password" name="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
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
                            <a href="/forgetPassword" className="register-link">Quên mật khẩu?</a>
                        <button type="button" className="login-button btn btn-outline-success " style={{marginLeft:"80px"}} onClick={handleLogin}>Đăng nhập</button>
                        <div className="divider"></div>
                        </div>
                        <div className="mt-3"></div>
                        <p className="text-center">Bạn chưa đăng ký? <span>
                            <Link to="/register" className="register-link ">Tạo tài khoản</Link></span></p>
                        </form>
                        </div>
                        <div className="d-flex justify-content-center">
                            <hr style={{flexGrow:"1",border:"none",height:"1px",backgroundColor:"black",marginRight:"20px"}}/>
                                <span style={{fontStyle:"italic"}}>Or Login With</span>
                            <hr style={{flexGrow:"1",border:"none",height:"1px",backgroundColor:"black",marginLeft:"20px"}}/>
                        </div>
                        <div className="mb-5 mt-3 d-flex justify-content-center">
                            <button type="button" className="btn" onClick={() => loginGoogle()} style={{borderColor:"black"}}>
                            <i className="fa-brands fa-google" style={{ color: "#DB4437", marginRight: "20px" }}></i>
                                Sign in with Google 🚀 
                            </button>
                        </div>
                </div>
                </div>
            </div>
    </div>
    );
}
