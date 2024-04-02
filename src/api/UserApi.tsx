import { CommentDTO } from "../dtos/users/CommentDTO";
import { LoginDTO } from "../dtos/users/LoginDTO";
import { RegisterDTO } from "../dtos/users/RegisterDTO"
import { ResetPasswordDTO } from "../dtos/users/ResetPasswordDTO";
import { UpdateUserDTO } from "../dtos/users/UpdateUserDTO";
import { UserResponse } from "../responses/UserResponse";
import { jwtDecode } from "jwt-decode";
import { Request } from "./Request";

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

export async function login(loginDTO:LoginDTO): Promise<any> {
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
            
        return response.text();
       
    } catch(error) {
        console.log(error);
        return `error : ${error}`;
    }
}

export async function getUserDetail(token: string): Promise<any> {
    
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
            throw new Error(`${response.status}`);
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

export async function submitComment(productId:number,content:string,points:number):Promise<any> {
    debugger
    const url:string = `http://localhost:8080/api/v1/comments?product_id=${productId}`;

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

    // Giải mã token hứng value của thuộc tính userId
    const decodedToken: { userId: number } = jwtDecode(token);

    // Lấy userId từ claims
    const userId:number = decodedToken.userId;

    const commentDTO:CommentDTO = {
        product_id:productId,
        user_id:userId,
        content:content,
        points:points
    }

    const response = await fetch(url,{
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(commentDTO)
    })

    return response.text();
}
export async function deleteComment(commentId:number):Promise<any> {
    const url:string = `http://localhost:8080/api/v1/comments/${commentId}`;

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

    const response = await fetch(url,{
        method:"DELETE",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })

    return response.text();
}

export async function updateComment(commentId:number,commentDTO:CommentDTO):Promise<any> {
    const url:string = `http://localhost:8080/api/v1/comments/${commentId}`;

    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found in Local Storage');
    }

    const response = await fetch(url,{
        method:"PUT",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            product_id:commentDTO.product_id,
            user_id:commentDTO.user_id,
            content:commentDTO.content,
            points:commentDTO.points
        })
    })

    return response.text();
    
}
