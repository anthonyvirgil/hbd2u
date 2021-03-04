import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectBirthdayError,
	addBirthday,
	clearErrors,
} from '../features/birthdaySlice';
import styled from 'styled-components';

const AddBirthday = () => {
	const nameRef = useRef(null);
	const birthDateRef = useRef(null);
	const dispatch = useDispatch();
	const birthdayError = useSelector(selectBirthdayError);

	useEffect(() => {
		dispatch(clearErrors);
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			addBirthday({
				name: nameRef.current.value,
				birthDate: birthDateRef.current.value,
			})
		);
	};

	const handleGoBack = (e) => {
		e.preventDefault();
	};

	return (
		<RegistrationContainer>
			<Title>
				<h3>Add Birthday</h3>
			</Title>
			<Error>{birthdayError}</Error>
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
					<Button type="button" onClick={handleGoBack}>
						Go Back
					</Button>
					<Button type="submit">Add</Button>
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
	width: inherit;
	display: flex;
	flex-direction: column;
`;

const Title = styled.div`
	margin-bottom: 10px;
	font-size: 2em;
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
