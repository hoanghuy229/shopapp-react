import React, { useEffect } from "react";
import { useState } from "react";
import { Product } from "../../models/Product";
import { ProductProp } from "../product/ProductProp";
import { Pagination } from "../utils/Pagination";
import { getAllProduct } from "../../api/ProductApi";


export const HomePage = () =>{
    const [Product,setProduct] = useState<Product[]>([]);
    const [currentPage,setcurrentPage] = useState(1);
    const [totalPage,settotalPage] = useState(0);

    useEffect(() =>{
        getAllProduct(currentPage-1)
        .then(
            rs =>{
                setProduct(rs.result);
                settotalPage(rs.totalPage);
            }
        )
        .catch(
            error =>{
                console.log("error" + error);
            }
        )
    },[currentPage]
    )

    const Paginating = (page : number) =>{
        setcurrentPage(page);
    }


    return(
        <div className="container mt-5 mb-5">
            <div className="search-box d-flex align-items-center justify-content-center">
                <input type="text" className="form-control search-input" placeholder="Tìm sản phẩm" style={{width:'300px'}}/>
                <select className="form-control product-category" style={{width:'200px'}}>
                    <option>Tất cả</option>
                    <option>...</option>
                </select>
                <button className="btn btn-primary ml-2">Tìm kiếm</button>
            </div>

            <div className="row mt-5 mb-4">
                {
                    Product.map((product) => (
                        <ProductProp key={product.id} product={product}></ProductProp>
                    ))
                }
            </div>
            <div style={{ display:'flex',justifyContent:'center'}}>
                <Pagination currentPage={currentPage} totalPage={totalPage} Paginating={Paginating}></Pagination>
            </div>
        </div>
    );
}
