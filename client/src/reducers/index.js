import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import birthdayReducer from './birthdayReducer';

export default combineReducers({
	auth: authReducer,
	error: errorReducer,
	birthday: birthdayReducer,
});
