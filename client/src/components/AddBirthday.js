import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import styled from 'styled-components/macro';
import { Link, useHistory } from 'react-router-dom';
import { addBirthday } from '../actions/birthdayActions';
import { logout } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import UploadImageForm from './UploadImageForm';

const AddBirthday = (props) => {
	const nameRef = useRef(null);
	const birthDateRef = useRef(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const [errorMessage, setErrorMessage] = useState('');
	const [fileUrl, setFileUrl] = useState('');

	useEffect(() => {
		const { error, isAuthenticated, birthday } = props;

		if (error.id === 'ADD_BIRTHDAY_FAIL') {
			setErrorMessage(error.msg);
		} else {
			setErrorMessage('');
		}

		if (!isAuthenticated) {
			dispatch(logout());
			history.push('/');
		}

		if (birthday) {
			history.push('/');
		}
	}, [props, history]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addBirthday({
				name: nameRef.current.value,
				birthDate: birthDateRef.current.value,
				imageURL: fileUrl,
				userId: localStorage.getItem('userId'),
				token: localStorage.getItem('token'),
			})
		);
	};

	return (
		<RegistrationContainer>
			<Title>
				<h3>Add Birthday</h3>
			</Title>
			<Error>{errorMessage}</Error>
			<UploadImageForm setFileUrl={setFileUrl}></UploadImageForm>
			<Form onSubmit={handleSubmit}>
				<InputLabel>
					<label htmlFor="name">Name</label>
				</InputLabel>
				<Input id="name" ref={nameRef} type="text"></Input>
				<InputLabel>
					<label htmlFor="birthday">Birthday (MM/DD/YYYY)</label>
				</InputLabel>
				<Input id="birthday" ref={birthDateRef} type="text"></Input>
				<ButtonContainer>
					<Link to="/">
						<Button type="button">Go Back</Button>
					</Link>
					<Button type="submit">Add</Button>
				</ButtonContainer>
			</Form>
		</RegistrationContainer>
	);
};

const mapStateToProps = (state) => ({
	birthday: state.birthday.birthday,
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { clearErrors, logout, addBirthday })(
	AddBirthday
);

const RegistrationContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	margin-right: auto;
	margin-left: auto;
	padding: 20px 0 20px 0;
	height: 90vh;
	overflow-y: auto;
`;

const Form = styled.form`
	width: inherit;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	margin-bottom: 10px;
	font-size: 2em;
`;

const Error = styled.div`
	color: var(--hbd-color-4);
	font-size: 1.2em;
	margin-bottom: 20px;
`;

const Input = styled.input`
	background-color: var(--hbd-color-1);
	margin-bottom: 20px;
	padding: 15px 20px;
	border-radius: 5px;
	color: var(hbd-color-container);
	font-size: 1.2em;
	outline-style: none;
	border-style: none;
`;

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
`;

const Button = styled.button`
	background-color: var(--hbd-color-3);
	margin: 0 20px 0 20px;
	width: 160px;
	padding: 15px 20px;
	border-radius: 25px;
	color: var(--hbd-font-color);
	font-size: 1.2em;
	outline-style: none;
	border-style: none;
	:hover {
		cursor: pointer;
	}
`;

const InputLabel = styled.div`
	align-self: self-start;
	margin-bottom: 10px;
`;
