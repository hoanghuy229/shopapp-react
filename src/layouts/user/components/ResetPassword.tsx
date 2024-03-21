import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ResetPasswordDTO } from '../../../dtos/users/ResetPasswordDTO';
import { resetPassword } from '../../../api/UserApi';

export const ResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const phoneNumber = searchParams.get('phoneNumber');
  const otp = searchParams.get('otp');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent) => {
    debugger
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const resetPass:ResetPasswordDTO = {
        password:password,
        re_password:confirmPassword
    }
    if(otp && phoneNumber){
        const response = await resetPassword(resetPass,phoneNumber,otp);
        if(response.includes("change password success")){
            const token = localStorage.getItem('token');
            const user = localStorage.getItem('user');
            if(token && user){
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
            alert("change password success !!!");
            navigate("/login");
        }
    }
    
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">Reset Password</h1>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">New Password</label>
              <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <a href="/login">quay lại</a>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};