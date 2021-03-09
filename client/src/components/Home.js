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

	return (
		<>
			<HomeContainer>
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
	padding: 20px 0 20px 0;
	height: 90vh;
	overflow-y: auto;
`;

const AddBirthdayIcon = styled.div`
	padding: 6px;
	border: 6px solid var(--hbd-color-3);
	border-radius: 50%;
`;
