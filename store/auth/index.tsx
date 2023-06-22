import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/apis/auth";
import { IAction } from "..";
import { AuthResult } from "../../models/auth";
interface LoginParam {
  userName: string,
  password: string,
}

export const loginAction = createAsyncThunk<
  AuthResult,
  LoginParam
>(
  "auth/login",
  async (payload) => {
    const { userName, password } = payload
    const res = await login(userName, password);
    return res;
  });

const initialState = {
  isAuth: false,
  user: null,
};

export type AuthState = typeof initialState;

const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {
    handleSignOut: (state: AuthState = initialState, action: IAction) => {
      state.isAuth = false;
      state.user = null;
      // clear from localStorage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, { payload }) => {
      const token = payload?.accessToken;

      state.isAuth = true;
      // save token localStorage
      // ...

    })
  },
});

export const { handleSignOut } =
  authSlice.actions;

const { reducer: authReducer } = authSlice;
export default authReducer;
