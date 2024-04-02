export class SocialAccountDTO {
    fullname?:string;
    google_account_id?:string;
    email?:string;
    role_id:number=2;

    constructor(
        fullname:string,
        google_account_id:string,
        email:string,
        role_id:number
    ){
        this.fullname = fullname;
        this.google_account_id =google_account_id;
        this.email = email;
        this.role_id = role_id || 2;
    }
}