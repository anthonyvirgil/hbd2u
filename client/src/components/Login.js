import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { connect } from 'react-redux';
import styled from 'styled-components/macro';

const Login = (props) => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const dispatch = useDispatch();
	const history = useHistory();
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const { error, isAuthenticated } = props;

		if (error.id === 'LOGIN_FAIL') {
			setErrorMessage(error.msg);
		} else {
			setErrorMessage('');
		}

		if (isAuthenticated) {
			history.push('/');
		}
	}, [props, history]);

	const handleSubmit = (e) => {
		e.preventDefault();
		e.stopPropagation();
		dispatch(clearErrors());
		dispatch(
			login({
				email: emailRef.current.value,
				password: passwordRef.current.value,
			})
		);
	};

	const handleGoBack = (e) => {
		e.preventDefault();
		history.push('/welcome');
	};

	return (
		<LoginContainer>
			<Title>
				<h3>Login</h3>
			</Title>
			<Error>{errorMessage}</Error>
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

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);

const LoginContainer = styled.div`
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
	cursor: pointer;
`;

const InputLabel = styled.div`
	align-self: self-start;
	margin-bottom: 10px;
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
