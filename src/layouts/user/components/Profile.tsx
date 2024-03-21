import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserDetail, updateUserDetail } from "../../../api/UserApi";
import { UpdateUserDTO } from "../../../dtos/users/UpdateUserDTO";

export const Profile = () => {
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState<string>(""); // Thay đổi kiểu dữ liệu của dateOfBirth thành string
    const [fullname, setFullName] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            getUserDetail(token)
                .then((userResponse) => {
                    setPhoneNumber(userResponse.phone_number);
                    setAddress(userResponse.address);
                    // Chuyển đổi dateOfBirth sang chuỗi theo định dạng yyyy-MM-dd
                    setDateOfBirth(new Date(userResponse.date_of_birth).toISOString().split("T")[0]);
                    setFullName(userResponse.fullname);
                })
                .catch((error) => console.log(error));
        }
    }, []);

    const handleChangeProfile = async (e:React.FormEvent) => {
        debugger
        e.preventDefault();

        if(address === '' || dateOfBirth === '' || fullname === ''){
            setError("fill the info");
            return;
        }

        const [year, month, day] = dateOfBirth.split("-").map(Number);

        const dateObject = new Date(year,month -1,day);

        const updateUserDTO:UpdateUserDTO = {
            fullname:fullname,
            address:address,
            date_of_birth:dateObject,
        }
        if(token){
            const response = await updateUserDetail(token,updateUserDTO);
            if(response.includes("update success!!!")){
                alert("update success !!!");
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate("/login");
            }
            else{
                setError(response);
            }
        }
    }


    if(localStorage.getItem('user') === null){
        alert("login!!!");
        navigate("/login");
        return(<h1>login!</h1>);
    }
    return (
        <div className="container mt-5">
            <form onSubmit={handleChangeProfile}>
            <div className="row justify-content-center">
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title" style={{ textAlign: "center" }}>
                                User Profile
                            </h2>
                        </div>
                        <div className="card-body" style={{ marginTop: "30px" }}>
                        {
                            error && (<p style={{color:'red'}}>{error}</p>)
                        }
                            <div className="row mb-5">
                                <div className="col-md-6">
                                    <strong>Phone Number:</strong>
                                    <input  
                                        className="form-control" 
                                        value={phoneNumber} 
                                        placeholder="Phone Number" 
                                        style={{ width: "200px" }} readOnly></input>
                                </div>
                                <div className="col-md-6">
                                    <strong>Date of Birth:</strong>
                                    <input
                                        type="date"
                                        value={dateOfBirth}
                                        className="form-control"
                                        placeholder="Date of Birth"
                                        style={{ width: "200px" }}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                    ></input>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-6">
                                    <strong>Full Name:</strong>{" "}
                                    <input 
                                        className="form-control" 
                                        value={fullname} 
                                        onChange={(e) => setFullName(e.target.value)} 
                                        placeholder="Full Name" 
                                        style={{ width: "200px" }}>
                                    </input>
                                </div>
                                <div className="col-md-6">
                                    <strong>Address:</strong>
                                    <input 
                                        className="form-control" 
                                        value={address} 
                                        onChange={(e) => setAddress(e.target.value)} 
                                        placeholder="Address" 
                                        style={{ width: "200px" }}> 
                                    </input>
                                </div>
                            </div>
                            <div className="row mb-5">
                                <div className="col-md-6">
                                    <strong>Password:</strong> ********* <a href="/forgetPassword">change password</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-center" style={{ margin: "50px" }}>
                        <button className="btn btn-outline-success" style={{ width: "150px", height: "50px", marginRight: "100px" }}>
                            Order History
                        </button>
                        <button 
                            type="submit"
                            className="btn btn-outline-warning" 
                            style={{ width: "150px", height: "50px" }}>
                                Change Profile
                        </button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    );
};

export default Profile;
