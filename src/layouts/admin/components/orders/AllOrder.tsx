import React, { ChangeEvent, useEffect, useState } from "react";

import { OrderResponse } from "../../../../responses/OrderResponse";
import { getAllOrder } from "../../../../api/AdminApi";
import { Pagination } from "../../../utils/Pagination";
import { useNavigate } from "react-router-dom";

interface AllOrder{
    handleOrderDetailClick:any;
}

export const AllOrder:React.FC<AllOrder> = (props) => {
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const [orders,setOrders] = useState<OrderResponse[]>([]);
    const [keyword,setKeyword] = useState("");
    const [momentKeyword,setMomentKeyword] = useState("");
    const [active,setActive] = useState<{[key:number]:string}>({});


    useEffect(() =>{
        debugger
        getAllOrder(currentPage-1,keyword)
        .then(
            rs => {
                setOrders(rs.result);
                setTotalPage(rs.totalPage);

                const newActives: {[key: number]: string} = {};
                rs.result.forEach(order => {
                    const Active:string = order.active?"true":"false";
                    newActives[order.id] = Active;
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
                <button className="btn btn-outline-primary" style={{marginLeft:"30px",fontSize:"20px"}} onClick={clickFind}>FIND ORDER</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User ID</th>
                            <th>Fullname</th>
                            <th>Phone Number</th>
                            <th>Status</th>
                            <th>Active</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user_id}</td>
                                <td>{order.fullname}</td>
                                <td>{order.phone_number}</td>
                                <td>{order.status}</td>
                                <td>{active[order.id]}</td>
                                <td><button className="btn btn-outline-success" style={{fontSize:"13px"}} onClick={() =>props.handleOrderDetailClick(order.id)}>DETAIL</button></td>
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