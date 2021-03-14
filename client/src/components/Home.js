import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { logout } from '../actions/authActions';
import { Redirect, useHistory } from 'react-router-dom';
import BirthdayList from './BirthdayList';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';
import { retrieveBirthdays } from '../actions/birthdayActions';

const Home = (props) => {
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		const { error, isAuthenticated } = props;

		if (error.id === 'GET_ALL_BIRTHDAYS_FAIL') {
			setErrorMessage(error.msg);
		} else {
			setErrorMessage('');
		}

		if (!isAuthenticated) {
			dispatch(logout());
			history.push('/');
		}

		dispatch(retrieveBirthdays(props.user?.id, localStorage.getItem('token')));
	}, [props, history]);

	return (
		<>
			{!props.isAuthenticated && <Redirect to="/welcome" />}
			<HomeContainer>
				<Error>{errorMessage}</Error>
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
			</HomeContainer>
		</>
	);
};

const mapStateToProps = (state) => ({
	birthdays: state.birthday.allBirthdays,
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, {})(Home);

const HomeContainer = styled.div`
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
