import { Star, StarFill, StarHalf } from "react-bootstrap-icons";


export const Rating = (points:number) => {
    const stars = [];
    for(let i = 1;i<=5;i++){
        if(i <= points){
            stars.push(<StarFill className="text-danger"></StarFill>)
        }
        else if(points <= (i - 0.1) && points > (i - 1)){
            stars.push(<StarHalf className="text-danger" />);
        }
        else{
            stars.push(<Star className="text-secondary"></Star>)
        }
    }
    return stars;
}