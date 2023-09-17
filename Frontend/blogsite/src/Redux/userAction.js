// store/userActions.js
import { loginUser } from "../Redux/slice/userSclice";
import axios from "axios"

// Asynchronous action using Redux Thunk
export const loginAsync = (userData) => async (dispatch) => {
    console.log(userData)
  try {
    const body = JSON.stringify(userData);
    const response = await axios.post(
      "http://10.201.1.171:8000/users/loginUser",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.Error)
    console.log(response);

    if (!response.data.Error) {
      localStorage.setItem("access_token", response.data.AccessToken);
      dispatch(loginUser(response.data.Data.username));
      return true; // Indicate successful login
    }
  } catch (error) {
    console.error(error);
  }

 return false// Indicate login failure
};
