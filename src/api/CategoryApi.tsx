import { Category } from "../models/Category";
import { Request } from "./Request";
async function getCate(url:string):Promise<Category[]>{
    try {
        const response = await Request(url);
        const categories: Category[] = response.map((item: any) => ({
            id: item.id,
            name: item.name
        }));
        return categories;
    } catch (error) {
        // Xử lý lỗi
        console.error('Error fetching categories:', error);
        return []; // Trả về mảng rỗng nếu có lỗi
    }
}


export function getCategory():Promise<Category[]>{
    const url:string = `http://localhost:8080/api/v1/categories`;
    return getCate(url);
}