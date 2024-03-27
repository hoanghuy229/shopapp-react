import { ProductImage } from "../models/ProductImages";

export interface ProductResponse{
    id: number;
    name: string;
    price: number;
    thumbnail: string;
    des: string;
    create_at: Date;
    update_at: Date;
    category_id: number;
    product_images: ProductImage[];
}