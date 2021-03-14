import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import BirthdayCard from './BirthdayCard';

const BirthdayList = (props) => {
	return (
		<>
			<BirthdayListContainer>
				<Title>
					<h3>Birthdays</h3>
				</Title>
				<BirthdaysContainer>
					{props.birthdays.map((birthday) => (
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

const Title = styled.div`
	margin-bottom: 10px;
	font-size: 2em;
`;

const BirthdaysContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Error = styled.div`
	color: var(--hbd-color-4);
	font-size: 1.2em;
	margin-bottom: 20px;
`;
