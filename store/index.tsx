import { AxiosResponse } from "axios";

import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";

export interface IAction {
  type: string,
  payload: AxiosResponse
}

const store = configureStore({
  reducer: {
    authReducer,
  },
  // middleware: [additionalMiddleware, logger] as const,
});

export default store;
