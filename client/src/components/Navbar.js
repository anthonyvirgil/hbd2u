import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components/macro';
import { logout } from '../actions/authActions';
import { useDispatch } from 'react-redux';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Navbar = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleToday = () => {
		history.push('/today');
	};
	const handleLogout = () => {
		dispatch(logout());
		history.push('/');
	};
	return (
		<NavbarContainer>
			<NavbarLinksContainer>
				<Button onClick={handleToday}>Today</Button>
			</NavbarLinksContainer>
			<NavbarLogo>
				<AppLogo>HBD2U</AppLogo>
			</NavbarLogo>
			<LogoutContainer>
				<Button onClick={handleLogout}>Logout</Button>
			</LogoutContainer>
		</NavbarContainer>
	);
};

export default Navbar;

const NavbarContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--hbd-color-main-bg);
	height: 75px;
	padding: 0 20px 0 20px;
`;

const NavbarLinksContainer = styled.div`
	width: 33.333%;
`;

const NavbarLogo = styled.div`
	width: 33.333%;
	display: flex;
	justify-content: center;
`;
const AppLogo = styled.h3`
	font-size: 2em;
`;

const LogoutContainer = styled.div`
	width: 33.333%;
	display: flex;
	justify-content: flex-end;
`;
const Button = styled.h2`
	border: none;
	background-color: transparent;
	color: var(--hbd-font-color);
	:hover {
		cursor: pointer;
	}
`;
