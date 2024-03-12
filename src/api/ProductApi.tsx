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

export function getAllProduct(currentPage:number):Promise<Result>{
    const url:string = `http://localhost:8080/api/v1/products?page=${currentPage}&limit=12`;
    return getProduct(url);
}
