import { LoginDTO } from "../dtos/users/LoginDTO";
import { RegisterDTO } from "../dtos/users/RegisterDTO"
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

