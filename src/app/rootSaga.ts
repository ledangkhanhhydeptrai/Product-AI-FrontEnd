import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import productSaga from "../features/product/productSaga";
import categorySaga from "../features/categories/categorySaga";
import brandSaga from "../features/brands/brandSaga";
import CartSaga from "../features/cart/CartSaga";
export default function* rootSaga() {
  yield all([
    authSaga(),
    productSaga(),
    categorySaga(),
    brandSaga(),
    CartSaga()
  ]);
}
