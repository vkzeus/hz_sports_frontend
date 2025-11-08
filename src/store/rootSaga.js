import { all } from "redux-saga/effects";
import authSaga from "../pages/login/saga/loginSaga.jsx";

export default function* rootSaga() {
  yield all([authSaga()]);
}
