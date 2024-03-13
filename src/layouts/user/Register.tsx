import React from "react";
import { Link } from "react-router-dom";

export const Register = () => {
    return(
        <div className="container">
            <form >
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="register-form mx-auto">
                        <h2 className="register-header" style={{textAlign:"center",margin:"30px"}}>Đăng ký</h2>
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" className="form-control" name="phone"  required/>
                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group password-field">
                            <label htmlFor="password">Mật khẩu</label>
                            <input type="password" placeholder="Ít nhất 3 ký tự" className="form-control" name="password" required/>
                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group password-field">
                            <label htmlFor="confirm-password">Nhập lại mật khẩu</label>
                            <input type="password" className="form-control" name="confirm-password"required/>
                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group">
                            <label htmlFor="full-name">Họ và tên</label>
                            <input type="text" className="form-control" name="full-name" required/>
                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group">
                            <label htmlFor="birth">ngày sinh</label>
                            <input type="date" className="form-control" name="birth"/>

                        </div>
                        <div className="mt-3"></div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input type="text" className="form-control" name="address" />

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
                        <button type="button" className="register-button btn btn-outline-success" style={{marginLeft:"280px"}} >Đăng ký</button>
                        <div className="mt-3"></div>
                        <p className="text-center">Bạn đã có tài khoản? <span>
                            <Link to="/login" className="register-link">Đăng nhập</Link></span></p>
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
}