import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import Home from './Home';
import Welcome from './Welcome';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddBirthday from './AddBirthday';

const Main = () => {
	const user = useSelector(selectUser) || localStorage.getItem('user');
	console.log(user);

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			localStorage.setItem('token', user?.token);
		}
		if (!localStorage.getItem('user')) {
			localStorage.setItem('user', user);
		}
	}, [user]);

	return <MainContainer>{user ? <Home /> : <Welcome />}</MainContainer>;
};

export default Main;

const MainContainer = styled.div`
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
