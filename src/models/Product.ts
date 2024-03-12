import { ProductImage } from "./ProductImages";

export class Product {
    id: number;
    name?: string;
    price?: number;
    thumbnail: string;
    des?: string;
    category_id?: number;
    url?: string;
    product_images: ProductImage[];

    constructor(
        id: number,
        product_images: ProductImage[],
        thumbnail: string,
        name?: string,
        price?: number,
        des?: string,
        category_id?: number,
        url?: string
    ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.thumbnail = thumbnail;
        this.des = des;
        this.category_id = category_id;
        this.url = url;
        this.product_images = product_images;
    }
}