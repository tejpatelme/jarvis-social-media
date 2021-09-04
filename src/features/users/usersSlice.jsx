import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { API } from "../../services/api-urls";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API.GET_ALL_USERS);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateFollowersAndFollowingCount = createAsyncThunk(
  "users/updateFollowersAndFollowing",
  async (toFollowUserId, thunkAPI) => {
    try {
      const response = await axios.post(API.UPDATE_FOLLOW_FOLLOWERS, {
        toFollowUserId,
      });

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "users/updateUserDetails",
  async (editData, thunkAPI) => {
    try {
      const response = await axios.post(API.UPDATE_USER_DETAILS, {
        editData: {
          firstName: editData.firstName,
          lastName: editData.lastName,
          bio: editData.bio,
        },
      });

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userToDisplay: null,
    users: [],
  },
  reducers: {
    getSingleUser: (state, action) => {
      const { userId } = action.payload;
      const user = state.users.find((user) => user._id === userId);
      state.userToDisplay = user;
    },
    resetUserToDisplay: (state) => {
      state.userToDisplay = null;
    },
    resetUsers: (state) => {
      state.users = [];
    },
    updateEditProfileData: (state, action) => {
      const { field, data } = action.payload;
      state.editProfileData[field] = data;
    },
    initializeEditProfileData: (state, action) => {
      state.editProfileData = {};
      const { userData } = action.payload;
      Object.entries(userData).forEach(
        ([key, value]) => (state.editProfileData[key] = value)
      );
    },
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload.users;
    },
    [updateFollowersAndFollowingCount.fulfilled]: (state, action) => {
      const { user: currentUser, followUser } = action.payload;
      const currentUserIndex = state.users.findIndex(
        (user) => user._id === currentUser._id
      );
      const followedUserIndex = state.users.findIndex(
        (user) => user._id === followUser._id
      );
      state.users[currentUserIndex] = currentUser;
      state.users[followedUserIndex] = followUser;
    },
    [updateFollowersAndFollowingCount.rejected]: (state, action) => {
      toast.error(action.payload.errorMessage);
    },
    [updateUserDetails.pending]: () => {
      toast.loading("Updating", { duration: 1500 });
    },
    [updateUserDetails.fulfilled]: (state, action) => {
      toast.success("Successfully Updated");
      state.editProfileData = {};
      const { updatedUser } = action.payload;
      const userIndex = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      state.users[userIndex] = updatedUser;
    },
  },
});

export const {
  resetUsers,
  getSingleUser,
  resetUserToDisplay,
  updateEditProfileData,
  initializeEditProfileData,
} = usersSlice.actions;
export default usersSlice.reducer;
