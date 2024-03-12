import axios from 'axios';
import { TokenService } from '../services/TokenService';

class TokenInterceptor {
    tokenService:TokenService


  constructor(tokenService:TokenService) {
    this.tokenService = tokenService;
    this.registerInterceptor();
  }

  registerInterceptor() {
    axios.interceptors.request.use(
      (config) => {
        const token = this.tokenService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  unregisterInterceptor() {
    // Hủy bỏ interceptor, nếu cần
  }
}

export default TokenInterceptor;
