import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk(
	'user/userLogin',
	async (loginData) => {
		try {
			const response = await axios
				.post('/api/users/login', loginData)
				.catch((err) => {
					throw err.response.data;
				});
			return response.data;
		} catch (error) {
			throw new Error(error);
		}
	}
);

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (registerData) => {
		try {
			const response = await axios
				.post('/api/users/register', registerData)
				.catch((err) => {
					throw err.response.data;
				});
			return response.data;
		} catch (error) {
			throw new Error(error);
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: null,
		loading: false,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.user = null;
		},
		clearErrors: (state, action) => {
			state.error = null;
		},
	},
	extraReducers: {
		[userLogin.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[userLogin.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		[userLogin.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
		[registerUser.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[registerUser.fulfilled]: (state, action) => {
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		[registerUser.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
	},
});

export const { login, logout, clearErrors } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserError = (state) => state.user.error;
export const selectUserLoading = (state) => state.user.loading;

export default userSlice.reducer;
