import { OrderDTO } from "../dtos/orders/OrderDTO";

// Phương thức để lấy token từ Local Storage
const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem('token');
}

// Phương thức đặt hàng
export async function placeOrder(orderDTO: OrderDTO): Promise<string> {
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
                cart_items: orderDTO.cart_items
            })
        });

        if (!response.ok) {
            throw new Error(`Cannot access ${url}`);
        }

        return "create order success";
    } catch (error) {
        console.log(error);
        return `${error}`;
    }
}