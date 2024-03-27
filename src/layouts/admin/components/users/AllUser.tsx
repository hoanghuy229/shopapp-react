import React, { ChangeEvent, useEffect, useState } from "react";
import { UserResponse } from "../../../../responses/UserResponse";
import { DeleteUser, getAllUser } from "../../../../api/AdminApi";
import { Pagination } from "../../../utils/Pagination";
import { format } from 'date-fns';

interface AllUser {
    handleAddUserView:any;
}

export const AllUser:React.FC<AllUser> = (props) => {
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

    const handleActivating = async (useId:number) => {
        if(window.confirm(`are you sure ?`)){
            const response = await DeleteUser(useId);
            if(response.includes("successfully")){
                alert("success !!!");
                window.location.reload();
            }else{
                alert("failed!!!");
            }
        }
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
                <button className="btn btn-primary ml-2" style={{marginLeft:"30px",fontSize:"20px"}} onClick={()=>props.handleAddUserView()}>ADD USER</button>

            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fullname</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>DateOfBirth</th>
                            <th>Is Active</th>
                            <th>Role</th>
                            <th>Activating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullname}</td>
                                <td>{user.phone_number}</td>
                                <td>{user.address}</td>
                                <td>{format(new Date(user.date_of_birth), 'yyyy/MM/dd')}</td>
                                <td>{active[user.id]}</td>
                                <td>{user.role.name}</td>
                                <td>
                                    <button hidden={active[user.id] === "false"} className="btn btn-outline-danger" style={{fontSize:"13px"}} onClick={(e)=>handleActivating(user.id)}>UNACTIVE</button>
                                    <button hidden={active[user.id] === "true"} className="btn btn-outline-primary" style={{fontSize:"13px"}} onClick={(e)=>handleActivating(user.id)}>ACTIVE</button>
                                </td>
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