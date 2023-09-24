import { configureStore } from "@reduxjs/toolkit";
import userSclice from "./slice/userSclice";
import thunk from "redux-thunk"; 

const store = configureStore({
  reducer: {
    userSclice,
  },
  middleware: [thunk], 
});

export default store;