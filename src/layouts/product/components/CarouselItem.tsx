import { Link } from "react-router-dom";
import { Product } from "../../../models/Product";

interface CarouselItem{
    carousel:Product;
}

export const CarouselItem : React.FC<CarouselItem> = (props) =>{
    const productId = props.carousel?.id;
    return (
        <Link to={`/product/${productId}`} style={{textDecoration:'none',color:'black'}}>
            <div className="row align-item-center">
                <div className="col-5 text-center">
                        <img src={props.carousel?.url} className="float-end" style={{width:'300px'}} />    
                </div>
                <div className="col-7">
                    <h5>{props.carousel?.name}</h5>
                <p style={{maxWidth:'700px'}}>{props.carousel?.des}</p>
                </div>
            </div>
        </Link>
     
);
}