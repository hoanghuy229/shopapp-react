export class CartItemDTO {
    product_id: number;

    quantity: number;

    constructor(product_id: number,quantity:number) {
        this.product_id = product_id;
        this.quantity = quantity;
    }
}
