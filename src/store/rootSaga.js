import { all } from "redux-saga/effects";
import authSaga from "../pages/login/saga/loginSaga.jsx";
import studentSaga from "./sagas/studentSaga";
import parentSaga from "./sagas/parentSaga";
import coachSaga from "./sagas/coachSaga";
import adminSaga from "./sagas/adminSaga";

export default function* rootSaga() {
  yield all([
    authSaga(),
    studentSaga(),
    parentSaga(),
    coachSaga(),
    adminSaga(),
  ]);
}
