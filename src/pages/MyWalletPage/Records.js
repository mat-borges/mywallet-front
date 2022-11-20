import styled from 'styled-components';
import { walletRecords } from '../../constants/mock.js';

export default function Records({ records, setRecords }) {
	return (
		<RecordsBox>
			{walletRecords.map((data, i) => {
				return (
					<Record key={i} color={data.type === 'income' ? '#03AC00' : '#C70000'}>
						<h1>{data.date}</h1>
						<h2>{data.description}</h2>
						<h3>{data.value}</h3>
					</Record>
				);
			})}
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
		color: ${(props) => props.color};
	}
`;
