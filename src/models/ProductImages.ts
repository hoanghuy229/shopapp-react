export class ProductImage {
    id: number;
    image_url : string;

    constructor(id:number,image_url:string){
        this.id = id;
        this.image_url = image_url;
    }
  }