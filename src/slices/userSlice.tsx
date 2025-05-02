import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  framework: any;
}

const initialState: UserState = {
  name: "",
  email: "",
  framework:[]
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setFramework(state, action: PayloadAction<any>) {
      state.framework = action.payload;
    }
  },
});

export const { setName, setEmail, setFramework } = userSlice.actions;
export default userSlice.reducer;
