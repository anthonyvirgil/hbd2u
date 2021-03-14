export const GET_ALL_BIRTHDAYS_LOADING = 'GET_ALL_BIRTHDAYS_LOADING';
export const GET_ALL_BIRTHDAYS_SUCCESS = 'GET_ALL_BIRTHDAYS_SUCCESS';
export const GET_ALL_BIRTHDAYS_FAIL = 'GET_ALL_BIRTHDAYS_FAIL';
export const GET_TODAY_BIRTHDAYS = 'GET_TODAY_BIRTHDAYS';
export const GET_TODAY_BIRTHDAYS_FAIL = 'GET_TODAY_BIRTHDAYS_FAIL';
export const ADD_BIRTHDAY_SUCCESS = 'ADD_BIRTHDAY_SUCCESS';
export const ADD_BIRTHDAY_FAIL = 'ADD_BIRTHDAY_FAIL';

const initialState = {
	allBirthdays: [],
	birthdaysToday: [],
	birthday: null,
	isLoading: false,
};

const birthdayReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_BIRTHDAYS_SUCCESS:
			return {
				...state,
				allBirthdays: action.payload,
			};
		case GET_ALL_BIRTHDAYS_FAIL:
			return {
				...state,
				allBirthdays: null,
			};
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
