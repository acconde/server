import {combineReducers} from 'redux';

import authReducer from '../pages/Login/reducer';
import projectReducer from '../pages/Project/reducer';
import dashboardReducer from '../pages/Dashboard/reducer';
import chatReducer from '../components/Chat/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  dashboard: dashboardReducer,
  chat: chatReducer
});

export default rootReducer;
