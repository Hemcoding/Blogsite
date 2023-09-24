// store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    user:""
  },
  reducers: {
    loginUser: (state, action) => {
      // return action.payload;
      state.user(action.payload)
    },
    logoutUser: (state) => {
      return null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
