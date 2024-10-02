import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../services/api-urls";

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(API.SIGNUP_USER, user);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const logInUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, thunkAPI) => {
    try {
      const response = await axios.post(API.LOGIN_USER, userCredentials);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const initializeCurrentUser = createAsyncThunk(
  "auth/initializeCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API.GET_SINGLE_USER);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginStatus: "idle",
    currentUser: null,
    token: JSON.parse(localStorage?.getItem("login"))?.token || null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem("login");
    },
  },
  extraReducers: {
    [signUpUser.pending]: () => {
      toast.loading("Signing up user..", { duration: 1500 });
    },
    [signUpUser.fulfilled]: () => {
      toast.success("Signup successful. Login to continue");
    },
    [signUpUser.rejected]: (state, action) => {
      toast.error(action.payload.errorMessage);
    },
    [logInUser.pending]: (state, action) => {
      state.loginStatus = "loading";
      toast.loading("Logging in..", { duration: 1500 });
    },
    [logInUser.fulfilled]: (state, action) => {
      state.loginStatus = "fulfilled";
      state.token = action.payload.token;
      state.currentUser = action.payload.user;
      localStorage.setItem(
        "login",
        JSON.stringify({ token: action.payload.token })
      );
      toast.success("Login Successful");
    },
    [logInUser.rejected]: (state, action) => {
      state.loginStatus = "rejected";
      toast.error(action.payload.errorMessage);
    },
    [initializeCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload.user;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
