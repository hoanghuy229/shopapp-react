export class CommentDTO{
    product_id:number;
    user_id:number;
    content?:string;
    points?:number;

    constructor(   product_id:number,
        user_id:number,
        content:string,
        points:number){
            this.product_id = product_id;
            this.user_id = user_id;
            this.content = content;
            this.points = points;
        }
}