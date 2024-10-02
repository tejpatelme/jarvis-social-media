const API_URL = import.meta.env.VITE_API_API_URL;

export const API = {
  BASE: `${API_URL}`,
  BASE_POST: `${API_URL}posts`,
  NEW_POST: `${API_URL}newpost`,
  GET_ALL_USERS: `${API_URL}users`,
  SIGNUP_USER: `${API_URL}users/signup`,
  LOGIN_USER: `${API_URL}users/login`,
  CREATE_NEW_POST: `${API_URL}posts/new`,
  UPDATE_FOLLOW_FOLLOWERS: `${API_URL}users/follow`,
  GET_SINGLE_USER: `${API_URL}users/singleuser`,
  POST_COMMENT: `${API_URL}posts/comment`,
  UPDATE_USER_DETAILS: `${API_URL}users/update`,
  POST_LIKES: `${API_URL}posts/likes`,
};
