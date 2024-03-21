import { Product } from "../models/Product";
import { Request } from "./Request";
import React from "react";


interface Result{
    result:Product[];
    totalPage:number;
}

async function getProduct(url : string):Promise<Result> {
    const result: Product[] = [];

    const response = await Request(url);

    const products: Product[] = response.products;
    const totalPages: number = response.totalPages;

    for(const key in products){
        result.push({
            id: products[key].id,
            name: products[key].name,
            price: products[key].price,
            thumbnail: products[key].thumbnail,
            des: products[key].des,
            category_id: products[key].category_id,
            url: `http://localhost:8080/api/v1/products/images/${products[key].thumbnail}`,
            product_images: products[key].product_images,
        });
    }

    return {result:result,totalPage:totalPages}
  
}

export function getAllProduct(currentPage:number,categoryId:number,keyword:string):Promise<Result>{

    const url:string = `http://localhost:8080/api/v1/products?page=${currentPage}&limit=12&category_id=${categoryId}&keyword=${keyword}`;
    return getProduct(url);
}

export async function getProductDetail(productId:number):Promise<Product | null>{
    const url:string = `http://localhost:8080/api/v1/products/${productId}`;
    try{
        const response = await Request(url);
        if(response){
            return{
                id: response.id,
                name: response.name,
                price: response.price,
                thumbnail: response.thumbnail,
                des: response.des,
                category_id: response.category_id,
                product_images: response.product_images,

            }
        }
        else{
            throw new Error("product not exist")
        }
    }
    catch(error){
        console.error('Error',error);
        return null;
    }
}

export async function getProductByIds(productIds:number[]):Promise<Product[]>{
    debugger
    // Chuyển mảng productIds thành chuỗi, phân cách bằng dấu ","
    const idsString: string = productIds.join(',');

    const url:string = `http://localhost:8080/api/v1/products/by-ids?ids=${idsString}`;

    try{
        const response = await Request(url);

        const result:Product[] = await response;
    
        return result;
    }
    catch(error){
        console.error('Error fetching products:', error);
        throw error;
    }
}