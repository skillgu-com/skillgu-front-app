// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import connectionProcessReducer from './connectionProcessReducer';
import userSettingReducer from './reducers/userSettingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  connectionProcess: connectionProcessReducer,
  userSetting: userSettingReducer,
  // Add other reducers if you have them
});

export default rootReducer;
