import axios from 'axios';
import { returnErrors } from './errorActions';
import {
	ADD_BIRTHDAY_SUCCESS,
	ADD_BIRTHDAY_FAIL,
	GET_ALL_BIRTHDAYS_FAIL,
	GET_ALL_BIRTHDAYS_SUCCESS,
	GET_TODAY_BIRTHDAYS_SUCCESS,
	GET_TODAY_BIRTHDAYS_FAIL,
} from '../reducers/birthdayReducer';

export const retrieveBirthdays = (userId, token) => (dispatch) => {
	axios
		.get('/api/birthdays', {
			params: { userId: userId },
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
		})
		.then((response) => {
			dispatch({
				type: GET_ALL_BIRTHDAYS_SUCCESS,
				payload: response.data,
			});
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					GET_ALL_BIRTHDAYS_FAIL
				)
			);
			dispatch({
				type: GET_ALL_BIRTHDAYS_FAIL,
			});
		});
};

export const retrieveBirthdaysToday = (userId, token) => (dispatch) => {
	let monthToday = new Date().getMonth() + 1;
	let dateToday = new Date().getDate();
	axios
		.get('/api/birthdays', {
			params: { userId: userId, month: monthToday, day: dateToday },
			headers: {
				'Content-Type': 'application/json',
				'x-auth-token': token,
			},
		})
		.then((response) => {
			dispatch({
				type: GET_TODAY_BIRTHDAYS_SUCCESS,
				payload: response.data,
			});
		})
		.catch((err) => {
			dispatch(
				returnErrors(
					err.response.data,
					err.response.status,
					GET_TODAY_BIRTHDAYS_FAIL
				)
			);
			dispatch({
				type: GET_TODAY_BIRTHDAYS_FAIL,
			});
		});
};

export const addBirthday = ({ name, birthDate, imageURL, userId, token }) => (
	dispatch
) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'x-auth-token': token,
		},
	};
	const body = JSON.stringify({ name, birthDate, imageURL, userId });

	axios
		.post('/api/birthdays/', body, config)
		.then((res) =>
			dispatch({
				type: ADD_BIRTHDAY_SUCCESS,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(
				returnErrors(err.response.data, err.response.status, ADD_BIRTHDAY_FAIL)
			);
			dispatch({
				type: ADD_BIRTHDAY_FAIL,
			});
		});
};
