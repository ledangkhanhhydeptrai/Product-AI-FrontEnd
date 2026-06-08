import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import notificationReducer from "../features/notification/notificationSlice"
const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
});
export default rootReducer;