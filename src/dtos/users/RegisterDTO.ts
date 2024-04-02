
export class RegisterDTO {
  fullname:string;
  phone_number:string;
  address:string;
  password:string;
  re_password:string;
  date_of_birth:Date | null;
  facebook_account_id:string | "0";
  google_account_id:string | "0";
  role_id:number=2;

  constructor(
    fullname:string,
    phone_number:string,
    address:string,
    password:string,
    re_password:string,
    date_of_birth:Date | null, 
    facebook_account_id:string,
    google_account_id:string,
    role_id:number
  ){
    this.fullname = fullname;
    this.phone_number = phone_number;
    this.address = address;
    this.password = password;
    this.re_password = re_password;
    this.date_of_birth = date_of_birth;
    this.facebook_account_id = facebook_account_id || "0";
    this.google_account_id = google_account_id || "0";
    this.role_id = role_id || 2;

  }
}