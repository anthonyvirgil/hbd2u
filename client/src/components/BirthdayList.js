import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import BirthdayCard from './BirthdayCard';

const BirthdayList = (props) => {
	const [birthdays, setBirthdays] = useState([]);

	useEffect(() => {
		axios
			.get('/api/birthdays', {
				params: { userId: props.user?.id },
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': localStorage.getItem('token'),
				},
			})
			.then((response) => setBirthdays(response.data))
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			{!props.isAuthenticated && <Redirect to="/welcome" />}
			<BirthdayListContainer>
				<h1>Birthdays</h1>
				<BirthdaysContainer>
					{birthdays.map((birthday) => (
						<BirthdayCard birthday={birthday}></BirthdayCard>
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

const BirthdayListContainer = styled.div`
	width: 100%;
	overflow-y: auto;
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
	::-webkit-scrollbar {
		width: 0 !important;
	}
`;

const BirthdaysContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
