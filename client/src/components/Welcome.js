import React from 'react';
import styled from 'styled-components';
import { FaBirthdayCake } from 'react-icons/fa';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Welcome = (props) => {
	return (
		<WelcomeContainer>
			{props.isAuthenticated ? (
				<Redirect to="/" />
			) : (
				<>
					<Title>
						<h1>HBD2U</h1>
					</Title>
					<Subtitle>Keep Track Of Your Favorite Birthdays</Subtitle>
					<BirthdayIcon>
						<FaBirthdayCake size={200} />
					</BirthdayIcon>
					<WelcomeButtons>
						<Link to="/register">
							<Button>Register</Button>
						</Link>
						<Link to="/login">
							<Button>Login</Button>
						</Link>
					</WelcomeButtons>
				</>
			)}
		</WelcomeContainer>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Welcome);

const WelcomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-right: auto;
	margin-left: auto;
	height: 100vh;
`;

const Title = styled.div`
	font-size: 3em;
`;

const Subtitle = styled.div`
	font-size: 1.5em;
	color: var(--hbd-color-4);
	@media (max-width: 450px) {
		font-size: 1.2em;
	}
`;

const BirthdayIcon = styled.div`
	margin: 40px 0 40px 0;
	@media (max-width: 450px) {
		margin: 30px 0 20px 0;
	}
`;

const WelcomeButtons = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 450px) {
		flex-direction: column;
	}
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

	@media (max-width: 450px) {
		margin: 10px 0 10px 0;
		width: 220px;
	}
`;
