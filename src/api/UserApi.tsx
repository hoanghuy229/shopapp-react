import { LoginDTO } from "../dtos/users/LoginDTO";
import { RegisterDTO } from "../dtos/users/RegisterDTO"
import { Request } from "./Request";

export async function register(registerDTO:RegisterDTO):Promise<any>{
    try{
        const url:string =`http://localhost:8080/api/v1/users/register`;

        const response = await fetch(url,
            {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({registerDTO})
            }
            );
            return response.status;
    }catch(error){
        console.log(error);
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
