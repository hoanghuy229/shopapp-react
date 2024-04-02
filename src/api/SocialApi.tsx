import { SocialAccountDTO } from "../dtos/users/SocialAccountDTO";

export async function GoogleGetInfo(access_token:string):Promise<any> {
    debugger
    try{
    const url:string = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;
    const response = await fetch(url,{
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json'
        }
    })
    if (!response.ok) {
        throw new Error('Failed to fetch profile');
    }
    const data = response.json();
    return data;
    }
    catch (error) {
        console.error(error);
    }
    
}

export async function GoogleLogin(socialAccountDTO:SocialAccountDTO):Promise<any> {
    debugger
    try{
        const url:string = `http://localhost:8080/api/v1/social/google-login`;

        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                fullname: socialAccountDTO.fullname,
                email: socialAccountDTO.email,
                google_account_id: socialAccountDTO.google_account_id,
                role_id: socialAccountDTO.role_id
            })
        })
        return response.text();
    }
    catch(error){
        throw new Error(`${error}`);
    }
}