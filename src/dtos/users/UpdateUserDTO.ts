export class UpdateUserDTO {
    fullname: string;    
    address: string;    
    date_of_birth: Date;    
    
    constructor(
        fullname: string,   
        address: string,   
        date_of_birth: Date 
    ) {
        this.fullname = fullname;
        this.address = address;
        this.date_of_birth = date_of_birth;        
    }
}