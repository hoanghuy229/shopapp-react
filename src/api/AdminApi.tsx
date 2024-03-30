import React from "react";
import { OrderResponse } from "../responses/OrderResponse";
import { UserResponse } from "../responses/UserResponse";
import { Request } from "./Request";
import { OrderDTO } from "../dtos/orders/OrderDTO";
import { ProductDTO } from "../dtos/products/ProductDTO";


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

export async function getOrderById(id:number):Promise<OrderResponse> {
    const url:string = `http://localhost:8080/api/v1/orders/${id}`;

    try{
        
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }
    const response = await fetch(url,{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

    const data = response.json();
    return data;
    }

    catch(error){
        throw new Error(`${error}`);
    }
}

export async function updateOrderById(id:number,orderResponse:OrderResponse):Promise<String> {
    debugger
    const url:string = `http://localhost:8080/api/v1/orders/${id}`;

    try{
        
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in Local Storage');
        }
        const response = await fetch(url,{
                method:"PUT",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    address: orderResponse.address,
                    note: orderResponse.note,
                    status: orderResponse.status,
                    user_id: orderResponse.user_id,
                    fullname: orderResponse.fullname,
                    phone_number: orderResponse.phone_number,
                    order_date: orderResponse.order_date,
                    total_price: orderResponse.total_price,
                    shipping_method: orderResponse.shipping_method,
                    shipping_address: orderResponse.shipping_address,
                    shipping_date: orderResponse.shipping_date,
                    tracking_number: orderResponse.tracking_number,
                    payment_method: orderResponse.payment_method,
                    active: orderResponse.active,
                    order_details:orderResponse.order_details
                })
            });
    
            if (!response.ok) {
                throw new Error(`Cannot access ${url}`);
            }
    
            return "update success";
        }
    
        catch(error){
            throw new Error(`${error}`);
        }
}

export async function DeleteUser(useId:number):Promise<any> {
    const url:string = `http://localhost:8080/api/v1/users/admin/${useId}`;

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

    const response = await fetch(url,{
        method:"DELETE",
        headers:{
            'Authorization': `Bearer ${token}`,
        },
    })
    if (!response.ok) {
        throw new Error(`Cannot access ${url}`);
    }

    return response.text();
    
}

export function AddNewCategory(cateName:String):Promise<any> {
    const url:string =`http://localhost:8080/api/v1/categories`;
    return manageCate(url,"POST",cateName);

}

export function UpdateCategory(cateId:number,cateName:String):Promise<any> {
    const url:string =`http://localhost:8080/api/v1/categories/${cateId}`;
    return manageCate(url,"PUT",cateName);

}

export function DeleteCategory(cateId:number):Promise<any> {
    const url:string =`http://localhost:8080/api/v1/categories/${cateId}`;
    return manageCate(url,"DELETE","");

}

async function manageCate(url:string,method:string,cateName:String):Promise<any> {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

const response = await fetch(url,{
    method:`${method}`,
    headers:{
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        name:cateName
    })
})
if (!response.ok) {
    throw new Error(`Cannot access ${url}`);
}

return response.text();
}

export async function deleteProduct(productId:number):Promise<string> {
    const url:string = `http://localhost:8080/api/v1/products/${productId}`;

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

    const response = await fetch(url,{
        method:"DELETE",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        throw new Error(`Cannot access ${url}`);
    }
    
    return response.text();
}

export async function addProduct(productDTO:ProductDTO):Promise<any> {
   try{
    debugger
    const url:string = `http://localhost:8080/api/v1/products`;

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

    const response = await fetch(url,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name:productDTO.name,
            price:productDTO.price,
            des:productDTO.des,
            category_id:productDTO.category_id,
        })
    })

    return response.text();
    
   }
   catch(error){
    throw new Error(`${error}`);
   }
}

export async function insertProductImages(productId:number,file:File):Promise<any> {
    debugger
   try{
    const url:string = `http://localhost:8080/api/v1/products/uploads/${productId}`;
    
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

    const formData = new FormData();
    formData.append("files",file);

    const response = await fetch(url,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
        },
        body:formData
    })

    if(!response.ok){
       console.log("has error");
    }
    return "add images success";
   }
   catch(error){
    throw new Error(`${error}`);
   }
}

export async function deleteProductImage(imageName:string):Promise<any> {
    try{
        const url:string = `http://localhost:8080/api/v1/products/delete/${imageName}`;

        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in Local Storage');
        }
    
        const response = await fetch(url,{
            method:"DELETE",
            headers:{
                'Authorization': `Bearer ${token}`,
            }
        })
    
        return response.text();
    }
    catch(error){
        throw new Error(`${error}`);
    }
    
}