import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import notificationReducer from "../features/notification/notificationSlice";
import ProductReducer from "../features/product/productSlice";
import CategoryReducer from "../features/categories/categorySlice";
const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  product: ProductReducer,
  category: CategoryReducer
});
export default rootReducer;
