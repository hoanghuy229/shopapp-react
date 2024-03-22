import React, { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../../../../models/Product";
import { getAllProduct } from "../../../../api/ProductApi";
import { Category } from "../../../../models/Category";
import { getCategory } from "../../../../api/CategoryApi";
import { Pagination } from "../../../utils/Pagination";

export const AllProduct = () => {
    const [products,setProducts] = useState<Product[]>([]);
    const [category,setCategory] = useState<Category[]>([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [totalPage,setTotalPage] = useState(0);
    const [keyword,setKeyword] = useState("");
    const [momentKeyword,setMomentKeyword] = useState("");
    const [selectCategory,setSelectCategory] = useState(0);

    useEffect(() => {
        getCategory()
        .then((categories) => setCategory(categories))
        .catch((error) => console.log(error))
    },[]);

    useEffect(() =>{
        debugger
        getAllProduct(currentPage-1,selectCategory,keyword)
        .then(
            rs => {
                setProducts(rs.result);
                setTotalPage(rs.totalPage);
            }
        )
        .catch(error => console.log(error));
    },[currentPage,selectCategory,keyword]);

    const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
        setMomentKeyword(e.target.value);
    }

    const Paginating = (page : number) =>{
        setCurrentPage(page);
    }

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setSelectCategory(value);
      };

    const clickFind = () => {
        setKeyword(momentKeyword);
    }


    return (
        <div className="container mt-5 mb-5">
        <div className="search-box d-flex align-items-center justify-content-center">
            <button className="btn btn-outline-primary ml-2">ADD PRODUCT</button>
            <input type="text" className="form-control search-input" placeholder="Search..." style={{width:'300px'}} onChange={handleSearch} value={momentKeyword}/>
            
            <select className="form-control product-category" style={{width:'200px'}} onChange={handleCategoryChange}>
                <option  value={0} >Tất cả</option>
                {
                    category.map((i)=>(
                        <option key={i.id} value={i.id} >{i.name}</option>
                    ))
                }
            </select>
            <button className="btn btn-outline-primary ml-2" onClick={clickFind}>FIND ORDER</button>
        </div>
        <div className="row mt-5 mb-4">
        <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Thumbnail</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category ID</th>
                            <th>Delete</th>
                            <th>Update</th>
                            <th>Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={product.url} style={{width:"75px",height:"75px"}}></img></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category_id}</td>
                                <td><button className="btn btn-outline-danger" style={{fontSize:"13px"}}>DELETE</button></td>
                                <td><button className="btn btn-outline-warning" style={{fontSize:"13px"}}>UPDATE</button></td>
                                <td><button className="btn btn-outline-success" style={{fontSize:"13px"}}>DETAIL</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div style={{ display:'flex',justifyContent:'center'}}>
            <Pagination currentPage={currentPage} totalPage={totalPage} Paginating={Paginating}></Pagination>
        </div>
    </div>
    );
}