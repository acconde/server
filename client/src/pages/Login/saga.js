import {put, call, takeLatest} from 'redux-saga/effects';
import {axios}  from '../../config';
import {
  getUserSuccess,
  loginError,
  loginSuccess,
  registerSuccess,
  updateUserSuccess
} from './actions';
import {
  GET_USER,
  LOGIN,
  REGISTER,
  UPDATE_USER, UPDATE_USER_AVATAR
} from './constants';
import {toast} from "react-toastify";
import {delay} from "../../utils/helpers";
import {SET_NOTIFICATIONS_SEEN} from "../Dashboard/constants";

export function* loginRequest(action) {
  try {
    const {email, password} = action.data;
    const res = yield call(axios.post, '/user/login', {email, password});
    const {token} = res.data;
    localStorage.setItem("token", token);
    yield call(axios.setToken, token);
    yield put(loginSuccess(res.data));
    action.data.navigate('/dashboard');
  } catch (e) {
    toast.warn(e?.response?.data?.message || 'An error occurred');
    yield put(loginError(e));
  }
}

export function* registerRequest(action) {
  try {
    const {firstName, lastName, email, password} = action.data;
    const res = yield call(axios.post, '/user', {firstName, lastName, email, password});
    const {token} = res.data;
    localStorage.setItem("token", token);
    yield call(axios.setToken, token);
    yield put(registerSuccess(res.data));
    action.data.navigate('/dashboard');
  } catch (e) {
    toast.warn(e?.response?.data?.message || 'An error occurred');
    yield put(loginError(e));
  }
}

export function* getUser() {
  try {
    const res = yield call(axios.get, '/user');
    yield put(getUserSuccess(res.data));
  } catch (e) {
    localStorage.removeItem('token');
    toast.warn(e?.response?.data?.message || 'An error occurred wile get user');
  }
}

export function* updateUser(action) {
  try {
    const res = yield call(axios.put, '/user', action.data);
    yield put(updateUserSuccess(res.data));
    toast.success('Profile updated ');
  } catch (e) {}
}

export function* setNotificationsSeen(action) {
  try {
    yield call(axios.put, '/notification/setSeen', action.data);
  } catch (e) {}
}

export function* updateAvatar(action) {
  yield call(axios.put, '/user/avatar', action.data.formData, {headers: {"Content-Type": "multipart/form-data"}});
}

export default function* () {
  yield takeLatest(LOGIN, loginRequest);
  yield takeLatest(REGISTER, registerRequest);
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(UPDATE_USER, updateUser);
  yield takeLatest(SET_NOTIFICATIONS_SEEN, setNotificationsSeen);
  yield takeLatest(UPDATE_USER_AVATAR, updateAvatar);
}
