import { LoginDTO } from "../dtos/users/LoginDTO";
import { RegisterDTO } from "../dtos/users/RegisterDTO"
import { ResetPasswordDTO } from "../dtos/users/ResetPasswordDTO";
import { UpdateUserDTO } from "../dtos/users/UpdateUserDTO";
import { UserResponse } from "../responses/UserResponse";

export async function registerUser(registerDTO:RegisterDTO):Promise<string>{
    try{
        const url:string =`http://localhost:8080/api/v1/users/register`;

        const response = await fetch(url,
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    fullname:registerDTO.fullname,
                    phone_number:registerDTO.phone_number,
                    address:registerDTO.address,
                    password:registerDTO.password,
                    re_password:registerDTO.re_password,
                    date_of_birth:registerDTO.date_of_birth, 
                    facebook_account_id:registerDTO.facebook_account_id,
                    google_account_id:registerDTO.google_account_id,
                    role_id:registerDTO.role_id
                })
            }
            );
            return response.text();
    }catch(error){
        console.log(error);
        return `have error : ${error}`
    }
}

export async function login(loginDTO:LoginDTO): Promise<string> {
    try {
        const url: string = `http://localhost:8080/api/v1/users/login`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phone_number: loginDTO.phone_number,
                password: loginDTO.password
            })
        });

        if (!response.ok) {
            return "Invalid username or password";
        }
            
        return response.text();
       
    } catch(error) {
        console.log(error);
        return `error : ${error}`;
    }
}

export async function getUserDetail(token: string): Promise<UserResponse> {
    const url: string = `http://localhost:8080/api/v1/users/details`;

    debugger
    try {
        const response = await fetch(url, {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user details. Status: ${response.status}`);
        }

        const userResponse: UserResponse = await response.json();
        
        return userResponse;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

export async function updateUserDetail(token:string,updateUserDTO:UpdateUserDTO):Promise<string> {
    debugger

    try{
        let userResponseJSON = localStorage.getItem('user');
    
        let userResponse:UserResponse = userResponseJSON? JSON.parse(userResponseJSON):null;
        
        const url:string = `http://localhost:8080/api/v1/users/details/${userResponse.id}`;

        const response = await fetch(url,{
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body:JSON.stringify({
                fullname: updateUserDTO.fullname,   
                address: updateUserDTO.address,   
                date_of_birth: updateUserDTO.date_of_birth
            })
        })

        if(!response.ok){
            return "update fail!!!";
        }
        return "update success!!!";
    }
    catch(error){
        console.log(`${error}`);
        return "update fail!!!";
    }
    
}



export function forgetPassword(phoneNumber:string) {
    const url:string = `http://localhost:8080/api/v1/users/otp/forgetPassword`;
    return Otpsending(url,phoneNumber);
}

export function validOtp(otp:string,phoneNumber:string) {
    const url:string = `http://localhost:8080/api/v1/users/otp/validateOtp?otp=${otp}`;
    return Otpsending(url,phoneNumber);
}

async function Otpsending(url:string,phoneNumber:string):Promise<String> {
    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                phone_number:phoneNumber
            })
        })

        if(!response.ok){
           return "have error";
        }
        return "success"
    }
    catch(error){
        throw new Error(`${error}`);
    }
}

export async function resetPassword(resetPasswordDT0:ResetPasswordDTO,phoneNumber:string,otp:string):Promise<any> {
    debugger
    const url:string = `http://localhost:8080/api/v1/users/otp/resetPassword?phone_number=${phoneNumber}&otp=${otp}`;

    try{
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                password:resetPasswordDT0.password,
                re_password:resetPasswordDT0.re_password
            })
        })
        return response.text();
    }
    catch(error){
        throw new Error(`${error}`);
    }
}
