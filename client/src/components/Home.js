import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../actions/authActions';
import { Redirect, useHistory } from 'react-router-dom';
import BirthdayList from './BirthdayList';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';

const Home = (props) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const { error, isAuthenticated } = props;

		if (error.id === 'ADD_BIRTHDAY_FAIL') {
			setErrorMessage(error.msg);
		} else {
			setErrorMessage('');
		}

		if (!isAuthenticated) {
			dispatch(logout());
			history.push('/');
		}
	}, [props, history]);

	const handleLogout = () => {
		dispatch(logout());
		history.push('/');
	};

	return (
		<>
			<HomeContainer>
				{/* {!props.isAuthenticated && <Redirect to="/welcome" />} */}
				<BirthdayList />
				<IconContext.Provider
					value={{
						color: 'var(--hbd-color-3)',
						size: '38px',
					}}
				>
					<AddBirthdayIcon>
						<Link to="/add">
							<FaPlus />
						</Link>
					</AddBirthdayIcon>
				</IconContext.Provider>
				<button onClick={handleLogout}>Logout</button>
			</HomeContainer>
		</>
	);
};

const mapStateToProps = (state) => ({
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
	height: 100vh;
	overflow-y: auto;
`;

const AddBirthdayIcon = styled.div`
	padding: 10px;
	border: 6px solid var(--hbd-color-3);
	border-radius: 50%;
`;
