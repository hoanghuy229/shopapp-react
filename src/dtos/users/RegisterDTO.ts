
export class RegisterDTO {
  fullname:string;
  phone_number:string;
  address:string;
  password:string;
  re_password:string;
  date_of_birth:Date;
  facebook_account_id:number=0;
  google_account_id:number=0;
  role_id:number=2;

  constructor(
    fullname:string,
    phone_number:string,
    address:string,
    password:string,
    re_password:string,
    date_of_birth:Date,
    facebook_account_id:number,
    google_account_id:number,
    role_id:number
  ){
    this.fullname = fullname;
    this.phone_number = phone_number;
    this.address = address;
    this.password = password;
    this.re_password = re_password;
    this.date_of_birth = date_of_birth;
    this.facebook_account_id = facebook_account_id || 0;
    this.google_account_id = google_account_id || 0;
    this.role_id = 2;

  }
}