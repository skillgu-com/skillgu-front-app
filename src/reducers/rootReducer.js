// rootReducer.js
import {combineReducers} from 'redux';
import authReducer from "./authReducer";
import connectionProcessReducer from "./connectionProcessReducer";
import userSettingReducer from "./userSettingReducer";
import calendarProcessReducer from "./calendarProcessReducer";
import sessionReducer from "./sessionProcessReducer";
import {useSelector} from "react-redux";


const rootReducer = combineReducers({
    auth: authReducer,
    connectionProcess: connectionProcessReducer,
    userSetting: userSettingReducer,
    calendar: calendarProcessReducer,
    sess: sessionReducer
    // Add other reducers if you have them
});

export default rootReducer;

