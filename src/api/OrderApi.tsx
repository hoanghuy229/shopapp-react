import { OrderDTO } from "../dtos/orders/OrderDTO";

export async function placeOrder(orderDTO:OrderDTO):Promise<any> {
    const url:string = `http://localhost:8080/api/v1/orders`;

    try{
        
    const response = await fetch(url,
        {
            method:"POST",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                user_id: orderDTO.user_id,
                fullname: orderDTO.fullname,
                email: orderDTO.email,
                phone_number: orderDTO.phone_number,
                address: orderDTO.address,
                note: orderDTO.note,
                total_price: orderDTO.total_price,
                shipping_method: orderDTO.shipping_method,
                payment_method: orderDTO.payment_method,
                cart_items: orderDTO.cart_items
            })
        });

        if(!response.ok){
            throw new Error(`cannot access ${url}`);
        }

        return response.json();
    }
    catch(error){
        console.log(error);
        return `error : ${error}`;
    }
}