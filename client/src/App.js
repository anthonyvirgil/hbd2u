import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './components/Main';
import AddBirthday from './components/AddBirthday';
import Registration from './components/Registration';
import Login from './components/Login';
import Welcome from './components/Welcome';
import styled from 'styled-components';

function App() {
	return (
		<Router>
			<AppContainer>
				<Switch>
					<Route path="/" exact component={Main} />
					<Route path="/welcome" exact component={Welcome} />
					<Route path="/register" exact component={Registration} />
					<Route path="/login" exact component={Login} />
					<Route path="/add" component={AddBirthday} />
				</Switch>
			</AppContainer>
		</Router>
	);
}

export default App;

const AppContainer = styled.div`
	margin-right: auto;
	margin-left: auto;

	max-width: 960px;

	padding-right: 10px;
	padding-left: 10px;
	height: 100vh;
	background-color: var(--hbd-color-main-bg);
	color: var(--hbd-font-color);
	overflow: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;
