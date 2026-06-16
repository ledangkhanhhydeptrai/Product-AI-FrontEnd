import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import notificationReducer from "../features/notification/notificationSlice";
import ProductReducer from "../features/product/productSlice";
import CategoryReducer from "../features/categories/categorySlice";
import BrandReducer from "../features/brands/brandSlice";
import CartReducer from "../features/cart/CartSlice";
import ProfileReducer from "../features/profile/profileSlice";
const rootReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  product: ProductReducer,
  category: CategoryReducer,
  brand: BrandReducer,
  cart: CartReducer,
  profile: ProfileReducer
});
export default rootReducer;
