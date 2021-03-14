import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { logout } from '../actions/authActions';
import BirthdayList from './BirthdayList';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { retrieveBirthdaysToday } from '../actions/birthdayActions';
import { GET_TODAY_BIRTHDAYS_FAIL } from '../reducers/birthdayReducer';

const TodayBirthdays = (props) => {
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		const { error, isAuthenticated } = props;

		if (error.id === GET_TODAY_BIRTHDAYS_FAIL) {
			setErrorMessage(error.msg);
		} else {
			setErrorMessage('');
		}

		if (!isAuthenticated) {
			dispatch(logout());
			history.push('/');
		}

		dispatch(
			retrieveBirthdaysToday(props.user?.id, localStorage.getItem('token'))
		);
	}, [props, history]);

	return (
		<>
			{!props.isAuthenticated && <Redirect to="/welcome" />}
			<TodayContainer>
				<Error>{errorMessage}</Error>
				<BirthdayTitle>
					<h3>Today's Birthdays</h3>
				</BirthdayTitle>
				<BirthdayList birthdays={props.birthdays} />
				<AddBirthdayIcon>
					<IconContext.Provider
						value={{
							color: 'var(--hbd-color-3)',
							size: '38px',
						}}
					>
						<Link to="/add">
							<FaPlus />
						</Link>
					</IconContext.Provider>
				</AddBirthdayIcon>
			</TodayContainer>
		</>
	);
};

const mapStateToProps = (state) => ({
	birthdays: state.birthday.todayBirthdays,
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, {})(TodayBirthdays);

const TodayContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-right: auto;
	margin-left: auto;
	padding: 20px 0 20px 0;
	height: 90vh;
	overflow-y: auto;
	background-color: var(--hbd-color-container2);
`;

const AddBirthdayIcon = styled.div`
	margin: 20px;
	padding: 6px;
	border: 6px solid var(--hbd-color-3);
	border-radius: 50%;
`;

const Error = styled.div`
	color: var(--hbd-color-4);
	font-size: 1.2em;
	margin-bottom: 20px;
`;

const BirthdayTitle = styled.div`
	margin-bottom: 10px;
	font-size: 2em;
`;
