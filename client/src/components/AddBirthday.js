import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserError,
	registerUser,
	clearErrors,
} from '../features/userSlice';
import styled from 'styled-components';

const AddBirthday = ({ goBack }) => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const birthDateRef = useRef(null);
	const dispatch = useDispatch();
	const userError = useSelector(selectUserError);

	useEffect(() => {
		dispatch(clearErrors);
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			registerUser({
				firstName: firstNameRef.current.value,
				lastName: lastNameRef.current.value,
				birthDate: birthDateRef.current.value,
				email: emailRef.current.value,
				password: passwordRef.current.value,
			})
		);
	};

	const handleGoBack = (e) => {
		e.preventDefault();
		goBack();
	};

	return (
		<RegistrationContainer>
			<Title>
				<h1>HBD2U</h1>
			</Title>
			<Subtitle>
				<p>Register now and never forget any birthdays!</p>
			</Subtitle>
			<Error>{userError}</Error>
			<Form onSubmit={handleSubmit}>
				<InputLabel>
					<label htmlFor="firstName">First Name</label>
				</InputLabel>
				<Input id="firstName" ref={firstNameRef} type="text"></Input>
				<InputLabel>
					<label htmlFor="lastName">Last Name</label>
				</InputLabel>
				<Input id="lastName" ref={lastNameRef} type="text"></Input>
				<InputLabel>
					<label htmlFor="birthday">Birthday (MM/DD/YYYY)</label>
				</InputLabel>
				<Input id="birthday" ref={birthDateRef} type="text"></Input>
				<InputLabel>
					<label htmlFor="email">Email</label>
				</InputLabel>
				<Input id="email" ref={emailRef} type="text"></Input>
				<InputLabel>
					<label htmlFor="password">Password</label>
				</InputLabel>
				<Input id="password" ref={passwordRef} type="password"></Input>
				<ButtonContainer>
					<Button type="button" onClick={handleGoBack}>
						Go Back
					</Button>
					<Button type="submit">Register</Button>
				</ButtonContainer>
			</Form>
		</RegistrationContainer>
	);
};

export default AddBirthday;

const RegistrationContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: auto;
	margin-left: auto;
	max-width: 960px;
	padding-right: 10px;
	padding-left: 10px;
	height: 100vh;
	background-color: var(--hbd-color-container2);
	color: var(--hbd-font-color);
	overflow: hidden;
`;

const Form = styled.form`
	width: 400px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	margin-bottom: 10px;
	font-size: 3em;
`;

const Subtitle = styled.div`
	color: var(--hbd-color-4);
	font-size: 1.2em;
	margin-bottom: 20px;
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
	border-radius: 15px;
	color: var(--hbd-font-color);
	font-size: 1.2em;
	outline-style: none;
	border-style: none;
`;

const InputLabel = styled.div`
	align-self: self-start;
	margin-bottom: 10px;
`;
