import React from "react";
import { useCookies } from "react-cookie";

const CartService = () => {
    const [cookies, setCookie] = useCookies(['cart']); //sử dụng hook useCookies để tạo cookie có tên 'cart' và set giá trị cho nó
    const { cart } = cookies; // trích xuất giá trị của cookie có tên 'cart' từ object cookies.

    //thêm vào giỏ hàng
    const addToCart = (productId:number, quantity:number = 1) => {
        const updatedCart = { ...cart };
        updatedCart[productId] = updatedCart[productId] ? updatedCart[productId] + quantity : quantity;
        setCookie('cart', updatedCart, { path: '/', maxAge: 86400 }); //  cookie được lưu trữ ở root của trang web, hết hạn sau 1 ngày
    };

    //lấy giỏ hàng hiện tại từ cookie.
    const getCart = () => {
        return cart || {}; //trả về giỏ hàng hoặc một object rỗng nếu không có
    };

    // xóa một sản phẩm khỏi giỏ hàng.
    const removeFromCart = (productId:number) => {
        const updatedCart = { ...cart };
        delete updatedCart[productId];
        setCookie('cart', updatedCart, { path: '/', maxAge: 86400 });
    };

    //cập nhật số lượng từng sản phẩm
    const updateQuantity = (productId:number,newQuantity:number) => {
        const updateQuantity = {...cart };
        updateQuantity[productId] = newQuantity
        setCookie('cart',updateQuantity, { path: '/',maxAge: 86400});
    }

    const clearCart = () => {
        setCookie('cart', {}, { path: '/', maxAge: -1 }); // Xóa cookie 'cart' bằng cách ghi đè nó bằng một object rỗng và đặt thời gian sống là -1
    };

    return {
        addToCart,
        getCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };
};

export default CartService;