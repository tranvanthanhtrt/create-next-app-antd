import { AxiosRequestConfig } from "axios";
const isProduction = process.env.REACT_APP_ENV === 'production';

const API_CONFIG: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: isProduction ? '/api/product' : '/api',
};
export {API_CONFIG}