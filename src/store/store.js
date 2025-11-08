import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import authReducer from "../pages/login/slice/loginSlice.jsx";
import studentReducer from "./slices/studentSlice";
import parentReducer from "./slices/parentSlice";
import coachReducer from "./slices/coachSlice";
import adminReducer from "./slices/adminSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    parent: parentReducer,
    coach: coachReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
