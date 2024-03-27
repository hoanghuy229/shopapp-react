import { CarouselShow } from "../product/CarouselShow";
import { ListProduct } from "./components/ListProduct";


export const HomePage = () =>{
  
    return(
        <div className="container mt-5 mb-5">
                <CarouselShow></CarouselShow>
                <ListProduct></ListProduct>
        </div>
    );
}
