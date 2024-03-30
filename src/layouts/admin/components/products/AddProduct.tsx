import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { getCategory } from "../../../../api/CategoryApi";
import { Category } from "../../../../models/Category";
import { ProductDTO } from "../../../../dtos/products/ProductDTO";
import { addProduct, insertProductImages } from "../../../../api/AdminApi";

export const AddProduct = () => {
    const [categories,setCategories] = useState<Category[]>([]);
    const [selectCategory,setSelectCategory] = useState(0);
    const [productName,setProductName] = useState("");
    const [productPrice,setProductPrice] = useState("");
    const [productDes,setProductDes] = useState("");

    useEffect(() => {
        getCategory()
        .then((categories) => setCategories(categories))
        .catch((error) => console.log(error))
        },[]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setSelectCategory(value);
    };

    const handleSumbit = async (e:React.FormEvent) => {
        debugger
        e.preventDefault();

        try{
            const priceDouble = Number(productPrice);

            const productDTO:ProductDTO = {
                name:productName,
                price:priceDouble,
                des:productDes,
                category_id:selectCategory
            }

            const response = await addProduct(productDTO);
            alert(`${response}`);

        }
        catch(error){
            console.log(error);
        }
    }



    return (
        <div className="container mt-5">
            <div className="card p-3">
            <h1 className="mb-5" style={{textAlign:"center"}}>ADD PRODUCT</h1>
            <form onSubmit={handleSumbit}>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={productDes}
                        onChange={(e) => setProductDes(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label">Category:</label>
                    <select className="form-control product-category" style={{width:'200px',marginLeft:"30px"}} onChange={handleCategoryChange}>
                    <option  value={0} >Danh sách thể loại</option>
                    {
                        categories.map((i)=>(
                            <option key={i.id} value={i.id} >{i.name}</option>
                        ))
                    }
                    </select>
                    <button type="submit" className="btn btn-outline-primary " style={{width:"100px",marginLeft:"200px"}}>Submit</button>

                </div>

            </form>
            
            </div>
        </div>
    );
};