import { AxiosResponse } from "axios";
import { API_CONFIG } from "../../configs/constant";
import { AuthResult } from "../../models/auth";
import { Api } from "../axios-interceptor";

// Get new Token by API CALL.
export const login = async (user: string, pass: string) => {
  const api = new Api(API_CONFIG);
  const { data } = await api.post<any,any,AxiosResponse<AuthResult>>(`/login`, {
    username: user,
    password: pass,
  });

  localStorage.setItem('token', data.accessToken);

  return data;
};