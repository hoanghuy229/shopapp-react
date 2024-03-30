export class ProductDTO {
    name:string;
    price:number;
    des?:string;
    category_id:number;

    constructor(
        name:string,
        price:number,
        des:string,
        category_id:number,
    )
    {
        this.name = name;
        this.price = price;
        this.des = des;
        this.category_id = category_id;
    }
}