import React, { ChangeEvent, useEffect, useState } from "react";
import { UserResponse } from "../../../../responses/UserResponse";
import { getAllUser } from "../../../../api/AdminApi";
import { Pagination } from "../../../utils/Pagination";

export const AllUser = () => {
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const [users,setUsers] = useState<UserResponse[]>([]);
    const [keyword,setKeyword] = useState("");
    const [momentKeyword,setMomentKeyword] = useState("");
    const [active,setActive] = useState<{[key:number]:string}>({});

    useEffect(() =>{
        debugger
        getAllUser(currentPage-1,keyword)
        .then(
            rs => {
                setUsers(rs.result);
                setTotalPage(rs.totalPage);

                const newActives: {[key: number]: string} = {};
                rs.result.forEach(user => {
                    const Active:string = user.is_active?"true":"false";
                    newActives[user.id] = Active;
                });
                setActive(newActives);
            }
            
        )
        .catch(error => console.log(error));
    },[currentPage,keyword])

    const Paginating = (page:number) => {
        setCurrentPage(page);
    }

    const clickFind = () => {
        setKeyword(momentKeyword);
    }
    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setMomentKeyword(e.target.value);
    }
    
    return (
        <div className="container mt-5 mb-5">
             <div className="d-flex mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search..." 
                    value={momentKeyword} 
                    onChange={handleSearch} 
                    style={{width:"300px"}}
                />
                <button className="btn btn-outline-primary" style={{marginLeft:"30px",fontSize:"20px"}} onClick={clickFind}>FIND USER</button>
                <button className="btn btn-primary ml-2" style={{marginLeft:"30px",fontSize:"20px"}} >ADD USER</button>

            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Is Active</th>
                            <th>Role</th>
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.address}</td>
                                <td>{active[user.id]}</td>
                                <td>{user.role.name}</td>
                                <td><button className="btn btn-outline-danger" style={{fontSize:"13px"}}>DELETE</button></td>
                                <td><button className="btn btn-outline-warning" style={{fontSize:"13px"}}>UPDATE</button></td>
                                <td><button className="btn btn-outline-success" style={{fontSize:"13px"}}>DETAIL</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ display:'flex',justifyContent:'center'}}>
                <Pagination currentPage={currentPage} totalPage={totalPage} Paginating={Paginating}></Pagination>
            </div>
        </div>
    );
}