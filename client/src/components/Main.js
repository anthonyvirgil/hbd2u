import React from 'react';
import styled from 'styled-components/macro';
import Home from './Home';
import Welcome from './Welcome';
import { connect } from 'react-redux';

const Main = (props) => {
	return (
		<MainContainer>
			{props.isAuthenticated ? <Home /> : <Welcome />}
		</MainContainer>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Main);

const MainContainer = styled.div`
	margin-right: auto;
	margin-left: auto;
	max-width: 960px;
	padding-right: 10px;
	padding-left: 10px;
	/* height: 100vh; */
	background-color: var(--hbd-color-container2);
	color: var(--hbd-font-color);
	/* overflow: hidden; */
`;
