export class LoginDTO {
  phone_number:string;
  password:string;

  constructor(
    phone_number:string,
    password:string,
  ){
    this.phone_number = phone_number;
    this.password = password;
  }
}