// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import connectionProcessReducer from "./connectionProcessReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    connectionProcess: connectionProcessReducer
    // Dodaj inne reduktory, jeśli będziesz miał
});

export default rootReducer;
