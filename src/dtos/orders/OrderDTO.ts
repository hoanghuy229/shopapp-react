export class OrderDTO {
    user_id: number;
    fullname: string;
    email: string;
    phone_number: string;
    address: string;
    note: string;
    total_price: number;
    shipping_method: string;
    payment_method: string;
  
    cart_items: { product_id: number, quantity: number }[]; // Thêm cart_items để lưu thông tin giỏ hàng
  
  
    constructor(
        user_id: number,
        fullname: string,
        email: string,
        phone_number: string,
        address: string,
        note: string,
        total_price: number,
        shipping_method: string,
        payment_method: string,
        cart_items: { product_id: number, quantity: number }[]
    ) {
      this.user_id = user_id;
      this.fullname = fullname;
      this.email = email;
      this.phone_number = phone_number;
      this.address = address;
      this.note = note;
      this.total_price = total_price;
      this.shipping_method = shipping_method;
      this.payment_method = payment_method;
      this.cart_items = cart_items;
    }
  }
  