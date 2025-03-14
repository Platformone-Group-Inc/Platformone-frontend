// TODO remove any
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  signupData: any;
  loading: boolean;
  token: string | null;
  userData: any;
}

const initialState: AuthState = {
  signupData: null,
  loading: false,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<any>) {
      state.signupData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("token", action.payload);
        } else {
          localStorage.removeItem("token");
        }
      }
    },
    setUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken, setUserData } =
  authSlice.actions;
export default authSlice.reducer;
