import React, { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import { Product } from "../../../models/Product";
import { ProductProp } from "../../product/components/ProductProp";
import { Pagination } from "../../utils/Pagination";
import { getAllProduct } from "../../../api/ProductApi";
import { Category } from "../../../models/Category";
import { getCategory } from "../../../api/CategoryApi";

export const ListProduct = () => {
    const [Product,setProduct] = useState<Product[]>([]);
    const [currentPage,setcurrentPage] = useState(1);
    const [totalPage,settotalPage] = useState(0);
    const [category,setCategory] = useState<Category[]>([]);
    const [keyword,setKeyWord] = useState('');
    const [selectCategory,setSelectCategory] = useState(0);

    useEffect(() => {
        debugger
        getCategory()
        .then((categories) => setCategory(categories))
        .catch((error) => console.log(error));
    },[]);

    useEffect(() =>{
        getAllProduct(currentPage-1,selectCategory,keyword)
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
    },[currentPage,selectCategory,keyword]
    )

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setKeyWord(e.target.value);
    }

    const Paginating = (page : number) =>{
        setcurrentPage(page);
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setSelectCategory(value);
      };

    return (
        <div style={{marginTop:"150px"}}>
             <div className="search-box d-flex align-items-center justify-content-center">
                <input type="text" className="form-control search-input" placeholder="Tìm sản phẩm" style={{width:'300px'}} onChange={handleSearch} value={keyword}/>
                
                <select className="form-control product-category" style={{width:'200px'}} onChange={handleCategoryChange}>
                    <option  value={0} >Tất cả</option>
                    {
                        category.map((i)=>(
                            <option key={i.id} value={i.id} >{i.name}</option>
                        ))
                    }
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