import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import productSaga from "../features/product/productSaga";
import categorySaga from "../features/categories/categorySaga";
export default function* rootSaga() {
  yield all([
    authSaga(),
    productSaga(),
    categorySaga()
  ]);
}
