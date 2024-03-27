import { ProductResponse } from "./ProductResponse";
import { UserResponse } from "./UserResponse";

export interface CommentResponse{
    id:number;
    content:string;
    points:number;
    create_at:Date;
    update_at:Date;
    user_response:UserResponse;
    product_response:ProductResponse;
}