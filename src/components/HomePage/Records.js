import styled from 'styled-components';

export default function Records() {
	return (
		<RecordsBox>
			<Record>
				<h1>30/11</h1>
				<h2>Testando uma descrição grande o suficiente pra ultrapassar a linha</h2>
				<h3>500,00</h3>
			</Record>
			<Record>
				<h1>30/11</h1>
				<h2>Almoço</h2>
				<h3>500,00</h3>
			</Record>
		</RecordsBox>
	);
}

const RecordsBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	width: 100%;
`;

const Record = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 1.5em;
	font-weight: 400;
	font-size: 16px;
	h1 {
		color: #c6c6c6;
	}
	h2 {
		width: 60%;
		color: #000;
		text-align: justify;
		@media (min-width: 660px) {
			width: 80%;
		}
	}
	h3 {
		color: #03ac00;
	}
`;
