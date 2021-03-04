import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
	selectUserError,
	userLogin,
	clearErrors,
	selectUser,
} from '../features/userSlice';
import styled from 'styled-components';

const Login = ({ goBack }) => {
	const user = useSelector(selectUser) || localStorage.getItem('user');
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const userError = useSelector(selectUserError);

	useEffect(() => {
		// dispatch(clearErrors());
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(
			userLogin({
				email: emailRef.current.value,
				password: passwordRef.current.value,
			})
		);
		if (localStorage.getItem('user')) {
			history.push('/');
		}
	};

	const handleGoBack = (e) => {
		e.preventDefault();
		history.push('/welcome');
	};

	return (
		<LoginContainer>
			<Title>
				<h1>HBD2U</h1>
			</Title>
			<Error>{userError}</Error>
			<Form onSubmit={(e) => handleSubmit(e)}>
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
					<Button type="submit">Login</Button>
				</ButtonContainer>
			</Form>
		</LoginContainer>
	);
};

export default Login;

const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-right: auto;
	margin-left: auto;
	max-width: 960px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	width: inherit;
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

const Title = styled.div`
	margin-bottom: 10px;
	font-size: 3em;
`;

const Error = styled.div`
	color: var(--hbd-color-4);
	font-size: 1.2em;
	margin-bottom: 20px;
`;
