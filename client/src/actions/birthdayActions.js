import axios from 'axios';
import { returnErrors } from './errorActions';
import {
	ADD_BIRTHDAY_SUCCESS,
	ADD_BIRTHDAY_FAIL,
} from '../reducers/birthdayReducer';

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
				returnErrors(
					err.response.data,
					err.response.status,
					'ADD_BIRTHDAY_FAIL'
				)
			);
			dispatch({
				type: ADD_BIRTHDAY_FAIL,
			});
		});
};
