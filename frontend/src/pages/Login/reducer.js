import produce from 'immer';
import {
  GET_USER,
  GET_USER_SUCCESS,
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS, LOGOUT, REGISTER, REGISTER_SUCCESS, SET_MODE, UPDATE_USER, UPDATE_USER_AVATAR,
  UPDATE_USER_SUCCESS
} from './constants';
import {SET_NOTIFICATIONS_SEEN} from "../Dashboard/constants";

export const initialState = {
  isLogin: localStorage.getItem("token"),
  mode: localStorage.getItem('mode') || 'light',
  user: {
    data: {},
    loading: false
  }
};

export default function (state = initialState, action = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
      case REGISTER:
      case GET_USER:
      case UPDATE_USER:
        draft.user.loading = true;
        break;
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        draft.user.data = {...state.user.data, ...action.payload};
        draft.isLogin = true;
        draft.user.loading = false;
        break;
      case LOGIN_ERROR:
        draft.user.loading = false;
        break;
      case GET_USER_SUCCESS:
      case UPDATE_USER_SUCCESS:
        draft.user.data = {...state.user.data, ...action.payload};
        draft.user.loading = false;
        break;
      case SET_MODE:
        draft.mode = action.payload;
        localStorage.setItem('mode', action.payload);
        break;
      case SET_NOTIFICATIONS_SEEN:
        draft.user.data.notifications = state.user.data.notifications.map(n => action.data.ids.includes(n._id) ? {...n, seen: true} : n);
        break;
      case UPDATE_USER_AVATAR:
        draft.user.data.avatar = action.data.preview;
        break;
      case LOGOUT:
        draft.isLogin = false;
        break;

      default:
        return state;
    }
  });
}
