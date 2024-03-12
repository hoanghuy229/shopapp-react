

export class TokenService {
    private readonly TOKEN_KEY =  'access_token';
  
  
    getToken() : string | null{
      return localStorage.getItem(this.TOKEN_KEY);
    };
  
    setToken(token : string):void{
      localStorage.setItem(this.TOKEN_KEY,token);
    }
  
    remove():void{
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }