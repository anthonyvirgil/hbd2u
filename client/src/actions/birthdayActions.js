import axios from 'axios';
import { returnErrors } from './errorActions';
import {
	ADD_BIRTHDAY_SUCCESS,
	ADD_BIRTHDAY_FAIL,
	GET_ALL_BIRTHDAYS_FAIL,
	GET_ALL_BIRTHDAYS_SUCCESS,
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
