import React from "react";
import { OrderResponse } from "../responses/OrderResponse";
import { UserResponse } from "../responses/UserResponse";


interface ResultOrder{
    result:OrderResponse[];
    totalPage:number;
}

interface ResultUser{
    result:UserResponse[];
    totalPage:number;
}

export async function getAllUser(page:number,keyword:string):Promise<ResultUser> {
    const result:UserResponse[] = [];
    const token = localStorage.getItem('token');

    const url:string = `http://localhost:8080/api/v1/users/admin/getAll?page=${page}&limit=10&keyword=${keyword}`;

    const response = await fetch(url,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    const users:UserResponse[] = data.userResponses;
    const totalPage:number = data.totalPages;

    for(const key in users){
        result.push({
            id:users[key].id,
            fullname:users[key].fullname,
            phone_number:users[key].phone_number,
            address:users[key].address,
            is_active:users[key].is_active,
            date_of_birth:users[key].date_of_birth,
            facebook_account_id:users[key].facebook_account_id,
            google_account_id:users[key].google_account_id,
            role:users[key].role,
        })
    }

    return {result:result,totalPage:totalPage}


}

export async function getAllOrder(page:number,keyword:string):Promise<ResultOrder> {
    debugger
    const result:OrderResponse[] = [];
    const token = localStorage.getItem('token');

    const url:string = `http://localhost:8080/api/v1/orders/admin/get-orders-admin?page=${page}&limit=10&keyword=${keyword}`;

    const response = await fetch(url,{
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    const orders:OrderResponse[] = data.orderResponses;
    const totalPage:number = data.totalPages;

    for(const key in orders){
        result.push({
            id: orders[key].id,
            address: orders[key].address,
            note: orders[key].note,
            status: orders[key].status,
            user_id: orders[key].user_id,
            fullname: orders[key].fullname,
            phone_number:orders[key].phone_number,
            order_date: orders[key].order_date,
            total_price: orders[key].total_price,
            shipping_method: orders[key].shipping_method,
            shipping_address: orders[key].shipping_address,
            shipping_date: orders[key].shipping_date,
            tracking_number: orders[key].tracking_number,
            payment_method: orders[key].payment_method,
            active: orders[key].active,
            order_details:orders[key].order_details
        })
    }
    return {result:result,totalPage:totalPage}
}