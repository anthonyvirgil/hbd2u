import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { selectUser, logout } from '../features/userSlice';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import BirthdayList from './BirthdayList';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Home = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector(selectUser) || localStorage.getItem('user');
	const token = localStorage.getItem('token');
	console.log(user);

	const handleLogout = () => {
		history.push('/');
		localStorage.setItem('user', undefined);
		dispatch(logout());
	};

	return (
		<>
			<HomeContainer>
				{!user && <Redirect to="/welcome" />}
				<BirthdayList />
				<IconContext.Provider
					value={{
						color: 'var(--hbd-color-3)',
						size: '38px',
					}}
				>
					<AddBirthdayContainer>
						<Link to="/add">
							<FaPlus />
						</Link>
					</AddBirthdayContainer>
				</IconContext.Provider>
				<button onClick={handleLogout}>Logout</button>
			</HomeContainer>
		</>
	);
};

export default Home;

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	text-align: center;
	margin-right: auto;
	margin-left: auto;
	height: 100vh;
`;

const AddBirthdayContainer = styled.div`
	padding: 10px;
	border: 6px solid var(--hbd-color-3);
	border-radius: 50%;
`;
