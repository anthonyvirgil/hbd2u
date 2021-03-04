import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import birthdayReducer from '../features/birthdaySlice';
import thunk from 'redux-thunk';

export default configureStore({
	reducer: {
		user: userReducer,
		birthday: birthdayReducer,
	},
	middleware: [thunk],
});
