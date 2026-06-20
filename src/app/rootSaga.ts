import { all } from "redux-saga/effects";
import authSaga from "../features/auth/authSaga";
import productSaga from "../features/product/productSaga";
import categorySaga from "../features/categories/categorySaga";
import brandSaga from "../features/brands/brandSaga";
import CartSaga from "../features/cart/CartSaga";
import profileSaga from "../features/profile/profileSaga";
import OrderSaga from "../features/order/OrderSaga";
import PaymentSaga from "../features/payment/paymentSaga";
export default function* rootSaga() {
  yield all([
    authSaga(),
    productSaga(),
    categorySaga(),
    brandSaga(),
    CartSaga(),
    profileSaga(),
    OrderSaga(),
    PaymentSaga()
  ]);
}
