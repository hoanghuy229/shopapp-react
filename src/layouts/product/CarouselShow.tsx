import { useEffect, useState } from "react";
import { Product } from "../../models/Product";
import { CarouselItem } from "./components/CarouselItem";
import { getCarousel } from "../../api/ProductApi";



export const CarouselShow = () => {
    const [carousels,setCarousel] = useState<Product[]>([]);


    useEffect(()=>{
        getCarousel()
        .then((data) =>{
            setCarousel(data.result);
        })
        .catch(error => console.log(error));
    },[]);

    return (

        <div id="carouselExampleDark" className="carousel carousel-dark slide mb-5" data-bs-interval="3000">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" >
                <CarouselItem key={0} carousel={carousels[0]}></CarouselItem>
                </div>
                <div className="carousel-item" >
                <CarouselItem key={1} carousel={carousels[1]}></CarouselItem>
                </div>
                <div className="carousel-item">
                <CarouselItem key={2} carousel={carousels[2]}></CarouselItem>
                </div>
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
      );
    };