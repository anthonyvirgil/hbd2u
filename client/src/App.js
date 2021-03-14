import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import AddBirthday from './components/AddBirthday';
import Registration from './components/Registration';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Navbar from './components/Navbar';
import styled from 'styled-components/macro';
import { connect } from 'react-redux';

function App(props) {
	useEffect(() => {
		// store.dispatch(loadUser());
	}, []);

	return (
		<Router>
			<AppContainer>
				{props.isAuthenticated && <Navbar />}
				<Switch>
					<Route path="/" exact component={Main} />
					<Route path="/welcome" exact component={Welcome} />
					<Route path="/register" exact component={Registration} />
					<Route path="/login" exact component={Login} />
					<Route path="/home" exact component={Home} />
					<Route path="/add" component={AddBirthday} />
				</Switch>
			</AppContainer>
		</Router>
	);
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(App);

const AppContainer = styled.div`
	margin-right: auto;
	margin-left: auto;
	max-width: 960px;
	padding-right: 10px;
	padding-left: 10px;
	height: 100vh;
	background-color: var(--hbd-color-main-bg);
	color: var(--hbd-font-color);
	&::-webkit-scrollbar {
		display: none;
	}
`;
