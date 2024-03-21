export class ResetPasswordDTO{
    password:string;
    re_password:string;

    constructor(password:string,re_password:string){
        this.password = password;
        this.re_password = re_password;
    }
}