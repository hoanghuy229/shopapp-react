import { OrderDetailResponse } from "./OrderDetailResponse";

export interface OrderResponse{
    id: number;
    address?: string;
    note?: string;
    status: string;
    user_id: number;
    fullname?: string;
    phone_number: string;
    order_date?: Date;
    total_price?: number;
    shipping_method?: string;
    shipping_address?: string;
    shipping_date?: Date;
    tracking_number?: number;
    payment_method?: string;
    active: boolean;
    order_details?:OrderDetailResponse[];
}