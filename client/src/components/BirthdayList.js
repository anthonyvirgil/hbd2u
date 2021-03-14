import styled from 'styled-components';
import { connect } from 'react-redux';
import BirthdayCard from './BirthdayCard';

const BirthdayList = (props) => {
	return (
		<>
			<BirthdayListContainer>
				<BirthdaysContainer>
					{props.birthdays ? (
						props.birthdays.map((birthday) => (
							<BirthdayCard birthday={birthday}></BirthdayCard>
						))
					) : (
						<h2>No birthdays to display</h2>
					)}
				</BirthdaysContainer>
			</BirthdayListContainer>
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, {})(BirthdayList);

const BirthdayListContainer = styled.div`
	width: 100%;
	overflow-y: auto;
	overflow: -moz-scrollbars-none;
	-ms-overflow-style: none;
	::-webkit-scrollbar {
		width: 0 !important;
	}
`;

const BirthdaysContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
