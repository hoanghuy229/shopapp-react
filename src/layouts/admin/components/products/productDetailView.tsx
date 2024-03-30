import { ChangeEvent, useEffect, useState } from "react";
import { getProductDetail } from "../../../../api/ProductApi";
import { Product } from "../../../../models/Product";
import { Category } from "../../../../models/Category";
import { getCategory } from "../../../../api/CategoryApi";
import { deleteProductImage, insertProductImages } from "../../../../api/AdminApi";

interface ProductDetailView {
    product:number;
}

export const ProductDetailView:React.FC<ProductDetailView> = (props) => {
    const productId = props.product;

    const [productDetail,setProductDetail] = useState<Product | null >(null);
    const [listImages,setListImages] = useState<string[]>([]);
    const [categories,setCategories] = useState<Category[]>([]);
    const [selectCategory,setSelectCategory] = useState(0);
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    useEffect(() => {
        getCategory()
        .then((categories) => setCategories(categories))
        .catch((error) => console.log(error))
        },[]);

    useEffect(() => {
        getProductDetail(productId)
        .then((detail) => {
            setProductDetail(detail);

            if (detail && detail.product_images.length > 0) {
                setListImages(prevImages => {
                    const newImages = detail.product_images.map(image => `http://localhost:8080/api/v1/products/images/${image.image_url}`);
                    return Array.from(new Set([...prevImages, ...newImages]));
                });
            }
        })
        .catch(error => console.log(error))
    },[productId])


    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value);
        setSelectCategory(value);
    };

     // Xử lý sự kiện khi có sự thay đổi trong input file
     const handleFileChange = (e:ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setSelectedImages(Array.from(files));
          }
    };

    const handleUpload = async () => {
        debugger
        // Gọi hàm xử lý sự kiện được truyền từ component cha
        if(selectedImages){
            for(let i = 0; i < selectedImages.length ; i++){
                const response = await insertProductImages(productId,selectedImages[i]);
            }
            alert("upload image success !!!")
            // Đặt lại danh sách các hình ảnh được chọn về trạng thái ban đầu
            setSelectedImages([]);
        }
    };

    const handleDeleteImage = async () => {

       if(window.confirm("are you sure ?")){
            if(productDetail?.product_images){
                for(let i = 0; i<productDetail.product_images.length; i++){
                    const response = await deleteProductImage(productDetail.product_images[i].image_url);
                }
                alert("delete product images success !!!");
            }
       }
    }

    return (
        <div className="container mt-5">
        <div className="card p-3">
        <h1 className="mb-5" style={{textAlign:"center"}}>ADD PRODUCT</h1>
        <form >
            <div className="mb-3">
                <label htmlFor="productId" className="form-label">Product ID:</label>
                <input
                    type="text"
                    className="form-control"
                    id="productId"
                    value={productDetail?.id}
                    readOnly
                />
            </div>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">Product Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="productName"
                    value={productDetail?.name}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">Price:</label>
                <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={productDetail?.price}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <textarea
                    className="form-control"
                    id="description"
                    value={productDetail?.des}
                    required
                ></textarea>
            </div>
            <div className="mb-3">
                    <label className="form-label">Category:</label>
                    <select className="form-control product-category" style={{width:'200px'}} onChange={handleCategoryChange}>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id} selected={productDetail?.category_id === category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

            <div className="d-flex align-items-center justify-content-center">
                <button type="submit" className="btn btn-outline-primary " style={{fontSize:"30px"}}>Submit</button>
            </div>
        </form>
        </div>
            <div className="card mt-5 p-3 mb-5">
                <h2 style={{textAlign:"center"}}>Product Images</h2>
                <div className="add-product-images">
                    <label className="form-label">Product images:</label>
                    <input type="file" className="form-control" multiple accept="image/*" onChange={handleFileChange} />
                    <button className="btn btn-success mt-3" onClick={handleUpload}>Upload</button>
                    <button className="btn btn-danger mt-3" onClick={handleDeleteImage} style={{marginLeft:"15px"}}>Delete</button>
                </div>

                <div className="image-container mt-5">
                <div id="carouselExampleDark" className="carousel carousel-dark slide mb-5 p-5" data-bs-interval="3000">
                    <div className="carousel-inner" style={{marginLeft:"250px"}}>
                        {listImages.map((image, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="row align-item-center">
                                    <div className="col-5 text-center">
                                        <img 
                                            src={image} 
                                            className="float-end" 
                                            alt={`image_${index}`}
                                            style={{ width: "250px",height:"200px", marginRight: "10px" }} 
                                        />    
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden" >Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                    </div>
                </div>
            </div>
    </div>
    )
}