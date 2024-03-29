import { OrderDTO } from "../dtos/orders/OrderDTO";
import { CouponResponse } from "../responses/CouponResponse";
import { OrderResponse } from "../responses/OrderResponse";
import { UserResponse } from "../responses/UserResponse";
import { Request } from "./Request";

// Phương thức để lấy token từ Local Storage
const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
}

// Phương thức đặt hàng
export async function placeOrder(orderDTO: OrderDTO): Promise<string> {
    debugger
    const url: string = `http://localhost:8080/api/v1/orders`;

    try {

        // Lấy token từ Local Storage
        const token = getTokenFromLocalStorage();

        //nếu không có báo lỗi
        if (!token) {
            throw new Error('Token not found in Local Storage');
        }

        const response = await fetch(url,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: orderDTO.user_id,
                fullname: orderDTO.fullname,
                email: orderDTO.email,
                phone_number: orderDTO.phone_number,
                address: orderDTO.address,
                note: orderDTO.note,
                total_price: orderDTO.total_price,
                shipping_method: orderDTO.shipping_method,
                payment_method: orderDTO.payment_method,
                cart_items: orderDTO.cart_items,
            })
        });

        if(response.status === 403){
            return "please login !!!"
        }

        return response.text();
    } catch (error) {
        console.log(error);
        return `${error}`;
    }
}

export async function getOrdersOfUser():Promise<OrderResponse[]> {
    debugger
   try{
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found in Local Storage');
        }
        let userResponseJSON = localStorage.getItem('user');
        let userResponse:UserResponse = userResponseJSON?JSON.parse(userResponseJSON) : null;

        const url:string = `http://localhost:8080/api/v1/orders/user/${userResponse.id}`;

        const response = await fetch(url,{
            method:"GET",
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        const data = response.json();
        return data;
   }
   catch(error){
    throw new Error(`${error}`);
   }
}

export async function discountCoupon(couponCode: string, totalPrice: number): Promise<CouponResponse> {
        try{
            const url: string = `http://localhost:8080/api/v1/discount?couponCode=${couponCode}&totalPrice=${totalPrice}`;
        const response = await Request(url);

        return { final_price: response.final_price, message: response.message };
        }
        catch(error){
            return { final_price: totalPrice, message: "coupon invalid !!!" };
        }

}
