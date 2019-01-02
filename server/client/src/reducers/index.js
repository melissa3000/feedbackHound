import { combineReducers } from 'redux';
import authReducer from './authReducer';

// the auth part of state is created by the authReducer
export default combineReducers({
	auth: authReducer
});