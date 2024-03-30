import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { registerUser } from "../../api/UserApi";
import { RegisterDTO } from "../../dtos/users/RegisterDTO";

export const Register = () => {
    const [phoneNumber,setPhoneNumber] = useState("");
    const [password,setPassword] = useState("");
    const [fullName,setFullName] = useState("");
    const [repassword,setRePassword] = useState("");
    const [dateOfBirth,setDateOfBirth] = useState<Date | null>(null);
    const [address,setAdress] = useState("");
    const [facebookAccount,setFaceBook] = useState(0);
    const [google,setGoogle] = useState(0);
    const [role,setRole] = useState(2);

    const [error,setError] = useState("");
    const [checkPass,setCheckPass] = useState("");
    const [checkRePass,setCheckRePass] = useState("");
    const [checkPhoneNumber,setCheckPhoneNumber] = useState("");
    const navigate = useNavigate();

    const formattedDate = dateOfBirth ? dateOfBirth.toISOString().substr(0, 10) : '';


    const register = async (e:React.FormEvent) => {
        e.preventDefault();

        debugger
        // Kiểm tra số điện thoại
        if (!validatePhoneNumber(phoneNumber)) {
            setError("Số điện thoại không hợp lệ");
            return;
        }
        // Kiểm tra mật khẩu
        if (!checkPasswordExist(password)) {
            setError("Mật khẩu phải có ít nhất 3 ký tự.");
            return;
        }
        // Kiểm tra mật khẩu nhập lại
        if (!checkRePasswordExist(repassword)) {
            setError("Mật khẩu không khớp.");
            return;
        }
        // // Tiếp tục xử lý đăng ký nếu các điều kiện hợp lệ
        const registerDTO:RegisterDTO = {
            fullname:fullName,
            phone_number:phoneNumber,
            address:address,
            password:password,
            re_password:repassword,
            date_of_birth:dateOfBirth,
            facebook_account_id:facebookAccount,
            google_account_id:google,
            role_id:role
        }
        try{
            const response:string = await registerUser(registerDTO);
            if(!response.includes("create successfully")){
                setError(response);
            }
            else{
                navigate("/login");
            }
        }
        catch(error){
            console.log(error);
        }
        
    }

     //kiem tra mat khau
     const checkPasswordExist = (password: string): boolean => {
        if (password.length < 3) {
            setCheckPass("Mật khẩu phải có ít nhất 3 ký tự.");
            return false;
        } else {
            setCheckPass(""); // Mật khẩu hợp lệ
            return true;
        }
    };
    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        //thay doi gia tri
        setPassword(e.target.value);
        //kiem tra
        setCheckPass('');
        //kiem tra su ton tai
        return checkPasswordExist(e.target.value);
    }

    //kiem tra mat khau lap lai
    const checkRePasswordExist = (repassword: string): boolean => {
        if (password !== repassword) {
            setCheckRePass("Mật khẩu không khớp.");
            return false;
        } else {
            setCheckRePass(""); // Mật khẩu nhập lại khớp
            return true;
        }
    };
    const handleRePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        //thay doi gia tri
        setRePassword(e.target.value);
        //kiem tra
        setCheckRePass('');
        //kiem tra su ton tai
        return checkRePasswordExist(e.target.value);
    }

    const validatePhoneNumber = (phoneNumber: string):boolean => {
        const regex = /^[0-9]{10,11}$/; //kiểm tra số điện thoại
        return regex.test(phoneNumber);// true 
    }

    const setPhone = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
        setCheckPhoneNumber("");
        if(!validatePhoneNumber(e.target.value)){
            setCheckPhoneNumber("Số điện thoại không hợp lệ");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="register-form mx-auto">
                        <h2 className="register-header" style={{textAlign:"center",margin:"30px"}}>Đăng ký</h2>
                        {
                            error && (<p style={{color:'red'}}>{error}</p>)
                        }
                        <form onSubmit={register}>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" className="form-control" name="phone"  value={phoneNumber} onChange={setPhone} required/>
                                {
                                checkPhoneNumber && (<p style={{color:'red'}}>{checkPhoneNumber}</p>)
                            }
                            </div>
                            <div className="mt-3"></div>
                            <div className="form-group password-field">
                                <label htmlFor="password">Mật khẩu</label>
                                <input type="password" placeholder="Ít nhất 3 ký tự" className="form-control" name="password" value={password} onChange={handlePassword} required/>
                            {
                                checkPass && (<p style={{color:'red'}}>{checkPass}</p>)
                            }
                            </div>
                            <div className="mt-3"></div>
                            <div className="form-group password-field">
                                <label htmlFor="confirm-password">Nhập lại mật khẩu</label>
                                <input type="password" className="form-control" name="confirm-password" value={repassword} onChange={handleRePassword} required/>
                                {
                                checkRePass && (<p style={{color:'red'}}>{checkRePass}</p>)
                            }
                            </div>
                            <div className="mt-3"></div>
                            <div className="form-group">
                                <label htmlFor="full-name">Họ và tên</label>
                                <input type="text" className="form-control" name="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} required/>
                            </div>
                            <div className="mt-3"></div>
                            <div className="form-group">
                                <label htmlFor="birth">ngày sinh</label>
                                <input type="date" className="form-control" name="birth" value={formattedDate} onChange={(e) => setDateOfBirth(new Date(e.target.value))}/>

                            </div>
                            <div className="mt-3"></div>
                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ</label>
                                <input type="text" className="form-control" name="address" value={address} onChange={(e) => setAdress(e.target.value)}/>

                            </div>
                            <div className="form-group">
                                <div className="form-check checkbox-text">
                                    <span style={{display:"flex"}}>
                                        <input type="checkbox" className="form-check-input" name="agree"/>
                                        <label className="form-check-label text-start" htmlFor="agree">
                                            Tôi đồng ý với các điều khoản và điều kiện</label>
                                    </span>
                                </div>
                                <div className="mt-4"></div>

                            </div>
                            <button type="submit" className="register-button btn btn-outline-success" style={{marginLeft:"280px"}}>Đăng ký</button>
                        </form>
                        <div className="mt-3"></div>
                        <p className="text-center">Bạn đã có tài khoản? <span>
                            <Link to="/login" className="register-link">Đăng nhập</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}