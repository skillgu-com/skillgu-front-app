// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import connectionProcessReducer from './connectionProcessReducer';
import userSettingReducer from './reducers/userSettingReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const authPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  connectionProcess: connectionProcessReducer,
  userSetting: userSettingReducer,
  // Add other reducers if you have them
});

export default rootReducer;
