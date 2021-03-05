import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

const BirthdayList = (props) => {
	const [birthdays, setBirthdays] = useState([]);

	useEffect(() => {
		axios
			.get('/api/birthdays', {
				params: { userId: props.user?.id },
				headers: { 'x-auth-token': localStorage.getItem('token') },
			})
			.then((response) => setBirthdays(response.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const getAge = (birthDate) => {
		var today = new Date();
		var birthDate = new Date(birthDate);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age = age - 1;
		}

		return age;
	};
	return (
		<>
			{!props.isAuthenticated && <Redirect to="/welcome" />}
			<BirthdayListContainer>
				<h1>Birthdays</h1>
				<BirthdaysContainer>
					{birthdays.map((birthday) => (
						<Birthday>
							<AvatarContainer>
								<Avatar src={birthday.imageURL}></Avatar>
							</AvatarContainer>
							<BirthdayInfo>
								<h1>{birthday.name}</h1>
								<h3>
									{new Intl.DateTimeFormat('en-US', {
										year: 'numeric',
										month: 'long',
										day: '2-digit',
									}).format(new Date(birthday.birthDate))}
								</h3>
								<h3>{`Age: ${getAge(new Date(birthday.birthDate))}`}</h3>
							</BirthdayInfo>
						</Birthday>
					))}
				</BirthdaysContainer>
			</BirthdayListContainer>
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, {})(BirthdayList);

const BirthdayListContainer = styled.div``;

const BirthdaysContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Birthday = styled.div`
	display: flex;
	height: 100px;
	width: 450px;
	background-color: var(--hbd-color-container);
	border-radius: 10px;
	margin: 20px;
	padding: 20px 0 20px 0;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
		rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const AvatarContainer = styled.div`
	width: 33.3333%;
`;

const Avatar = styled.img`
	margin-right: 15px;
	margin-left: 15px;
	height: 100px;
	border-radius: 100%;
`;

const BirthdayInfo = styled.div`
	display: flex;
	width: 50%;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
`;
