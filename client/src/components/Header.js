import React from 'react';
import styled from 'styled-components/macro';

const Header = () => {
	return (
		<HeaderContainer>
			<HeaderLeft>
				<h1>HBD2U</h1>
			</HeaderLeft>
			<HeaderRight>
				<HeaderLink>Register</HeaderLink>
				<HeaderLink>Login</HeaderLink>
			</HeaderRight>
		</HeaderContainer>
	);
};

export default Header;

const HeaderContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-between;
	padding: 10px 0;
	background-color: var(--hbd-color-header);
	color: var(--hbd-font-color);
`;

const HeaderLeft = styled.div`
	flex: 0.3;
	display: flex;
	margin-left: 30px;
`;

const HeaderRight = styled.div`
	flex: 0.1;
	display: flex;
	align-items: center;
	justify-content: space-around;
	margin-right: 30px;
`;

const HeaderLink = styled.div`
	margin-right: 30px;
`;
