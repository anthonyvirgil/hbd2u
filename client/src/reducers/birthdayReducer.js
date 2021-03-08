export const BIRTHDAY_LOADED = 'BIRTHDAY_LOADED';
export const BIRTHDAY_LOADING = 'BIRTHDAY_LOADING';
export const BIRTHDAYS_LOADING = 'BIRTHDAYS_LOADING';
export const BIRTHDAYS_LOADED = 'BIRTHDAYS_LOADED';
export const GET_TODAY_BIRTHDAYS = 'GET_TODAY_BIRTHDAYS';
export const GET_TODAY_BIRTHDAYS_FAIL = 'GET_TODAY_BIRTHDAYS_FAIL';
export const ADD_BIRTHDAY_SUCCESS = 'ADD_BIRTHDAY_SUCCESS';
export const ADD_BIRTHDAY_FAIL = 'ADD_BIRTHDAY_FAIL';

const initialState = {
	allBirthdays: [],
	todayBirthday: [],
	birthday: null,
	isLoading: false,
};

const birthdayReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_BIRTHDAY_SUCCESS:
			return {
				...state,
				birthday: action.payload,
			};
		case ADD_BIRTHDAY_FAIL:
			return { ...state, isLoading: false, birthday: null };
		default:
			return state;
	}
};

export default birthdayReducer;
