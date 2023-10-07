// rootReducer.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    // Dodaj inne reduktory, jeśli będziesz miał
});

export default rootReducer;
