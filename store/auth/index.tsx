import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../services/apis/auth";
import { IAction } from "..";

export const loginAction = createAsyncThunk("auth/login", async (userName: string, password: string) => {
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
  initialState: {
    isAuth: false,
  },
  reducers: {
    handleSignOut: (state: AuthState = initialState, action: IAction) => {
      state.isAuth = false;
      state.user = null;
      // clear from localStorage
    },
  },
  extraReducers: {
    [loginAction.fulfilled]: (state: AuthState = initialState, action: IAction) => {
      const token = action?.payload?.data?.data?.accessToken;

      state.isAuth = true;

      // save token localStorage
      // ...
    },
  },
});

export const { handleSignOut } =
  authSlice.actions;

const { reducer: authReducer } = authSlice;
export default authReducer;
