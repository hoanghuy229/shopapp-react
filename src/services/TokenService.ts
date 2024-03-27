import { jwtDecode } from "jwt-decode";

export function getUserId(token:string | null) {
  debugger
    try {
        if(token == null){
          console.log("dont have token");
          return;
        }
        // Giải mã token hứng value của thuộc tính userId
        const decodedToken: { userId: number } = jwtDecode(token);

        // Lấy userId từ claims
        const userId:number = decodedToken.userId;

        return userId;
    } catch (error) {
        console.error("Error decoding token:", error);
        throw new Error(`${error}`);
    }
}

export function isTokenExpired(token: string): boolean {
    debugger
  try {
      if (token == null) {
          return false;
      }

      const decodedToken: { exp: number } = jwtDecode(token);

      // Kiểm tra xem thuộc tính exp có tồn tại không
      if (decodedToken.exp === undefined) {
          console.error("Token does not contain expiration time.");
          return true;
      }

      const currentTime = Math.floor(Date.now() / 1000); // Chia cho 1000 để chuyển đổi sang giây

      return decodedToken.exp < currentTime; // true nếu token hết hạn

  } catch (error) {
      console.error("Error decoding token:", error);
      return true; // Giả định rằng token đã hết hạn nếu giải mã thất bại
  }
}
