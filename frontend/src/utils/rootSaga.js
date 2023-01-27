import {all} from "redux-saga/effects";
import authSaga from '../pages/Login/saga';
import projectSaga from '../pages/Project/saga';
import dashboardSaga from '../pages/Dashboard/saga';
import chatSaga from '../components/Chat/saga';

export default function* rootSaga() {
  yield all([authSaga(), dashboardSaga(), projectSaga(), chatSaga()]);
}
