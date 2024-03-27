import React, { useEffect, useState } from "react";
import { ProductImages } from "./components/ProductImages";
import styles from '../css/ProductDetail.module.css'
import { Product } from "../../models/Product";
import { useParams } from "react-router-dom";
import { getProductDetail } from "../../api/ProductApi";
import CartService from "../../services/CookieService";
import { useNavigate } from "react-router-dom";
import { getUserId, isTokenExpired } from "../../services/TokenService";
import { ProductComments } from "./components/ProductComments";

export const ProductDetail = () => {
    const cartService = CartService();
    const { productId } = useParams();
    const navigate = useNavigate();

    let productIdNumber = 0;

    try {
        productIdNumber = parseInt(productId + '');
        if (Number.isNaN(productIdNumber)) {
            productIdNumber = 0;
        }
    } catch (error) {
        productIdNumber = 0;
        console.error(error);
    }

    const [productDetail, setProductDetail] = useState<Product | null>(null);
    const [listImages,setListImages] = useState<string[]>([]);
    const [quantity,setQuantity] = useState(1);

    useEffect(() => {
        getProductDetail(productIdNumber)
        .then((detail) => {
            setProductDetail(detail);
            // Gọi hàm getImages cho mỗi hình ảnh trong productDetail

            debugger
            if (detail && detail.product_images.length > 0) {
                setListImages(prevImages => {
                    const newImages = detail.product_images.map(image => `http://localhost:8080/api/v1/products/images/${image.image_url}`);
                    return Array.from(new Set([...prevImages, ...newImages]));
                });
            }
            else if (detail && detail.product_images.length === 0) {
                    let url: string = `http://localhost:8080/api/v1/products/images/notfound.jpg`;
                    return setListImages([...listImages,url]);
            }
        })
        .catch((error) => console.log(error));
    }, [productId]);
    debugger

    const increase = () => {
        setQuantity(quantity + 1);
    }
    const decrease = () => {
        if(quantity>1)
        setQuantity(quantity - 1);
    }

    const addProductToCart = () => {
        if(productDetail){
            cartService.addToCart(productDetail.id,quantity);
        }
        else {
            console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
          }
    }

    const buyNow = () => {
        if(productDetail){
            cartService.addToCart(productDetail.id,quantity);
            
            debugger
            const token = localStorage.getItem("token");

            if(token == null){
                alert("need login !!!");
                navigate("/login");
            }
            else {
                const userId = getUserId(token);
            
                if(!isTokenExpired(token) && userId){
                    navigate("/orderConfirm");
                }
            }
        }
        else {
            console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
          }
    }

    return (
        <div className="container">
            <div className="intro-section">
                <h1 style={{textAlign:'center',margin:"50px"}}>Product Detail</h1>
            </div>
            <div className="row mt-5 mb-5">
                <div className="col-4">
                    <ProductImages listImages = {listImages}></ProductImages>
                </div>

                <div className="col-8">
                    <div className="row">
                    <div className="col-6">
                    <div className="product-details">
                        <h2>{productDetail?.name}</h2>
                        <p>{productDetail?.des}</p>
                        <p>Giá: {productDetail?.price}$</p>
                    </div>
                    </div>
                    <div className="col-md-4">
                         <div className="input-group mb-3">
                                <button className="btn btn-outline-secondary" type="button" onClick={decrease}>-</button>
                                <input type="text" className="form-control text-center" value={quantity} />
                                <button className="btn btn-outline-secondary" type="button" onClick={increase}>+</button>
                            </div>
                            <button className="btn btn-outline-danger d-block w-100 mt-4 mb-2" onClick={buyNow}>Mua ngay</button>
                            <button className="btn btn-outline-primary d-block w-100 mt-3 mb-2" onClick={addProductToCart}>Thêm vào giỏ</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ProductComments productId={productIdNumber}></ProductComments>
            </div>
        </div>
    );
}