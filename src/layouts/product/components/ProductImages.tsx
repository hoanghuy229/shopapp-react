import React from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ProductImage } from "../../../models/ProductImages";

interface ProductImagesProps {
    listImages: string[]; // Sử dụng kiểu string thay vì String
}

export const ProductImages: React.FC<ProductImagesProps> = (props) => {
    debugger
    return (
        <div className="row">
            <div className="col-12">
                
                <Carousel>
                    {props.listImages.map((img, index) => (
                        <div key={index}>
                            <img src={img} alt="Product image" style={{maxWidth:"300px"}} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};
