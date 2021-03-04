import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addBirthday = createAsyncThunk(
	'birthday/addBirthday',
	async (birthdayData) => {
		try {
			const response = await axios
				.post('/api/birthdays', birthdayData)
				.catch((err) => {
					throw err.response.data;
				});
			return response.data;
		} catch (error) {
			throw new Error(error);
		}
	}
);

export const birthdaySlice = createSlice({
	name: 'birthday',
	initialState: {
		birthday: null,
		loading: false,
		error: null,
	},
	reducers: {
		clearErrors: (state, action) => {
			state.error = null;
		},
	},
	extraReducers: {
		[addBirthday.pending]: (state, action) => {
			state.loading = true;
			state.error = null;
		},
		[addBirthday.fulfilled]: (state, action) => {
			state.birthday = action.payload;
			state.loading = false;
			state.error = null;
		},
		[addBirthday.rejected]: (state, action) => {
			state.error = action.error.message;
			state.loading = false;
		},
	},
});

export const { clearErrors } = birthdaySlice.actions;

export const selectBirthdayError = (state) => state.birthday.error;
export const selectBirthdayLoading = (state) => state.birthday.loading;

export default birthdaySlice.reducer;
