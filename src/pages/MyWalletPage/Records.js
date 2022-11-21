import { MdDeleteForever } from 'react-icons/md';
import styled from 'styled-components';

export default function Records({ records }) {
	function removeEntry(data) {
		console.log(data._id);
	}
	return (
		<RecordsBox>
			{records.map((data, i) => {
				return (
					<Record key={i} color={data.type === 'income' ? '#03AC00' : '#C70000'}>
						<h1>{data.date}</h1>
						<h2>{data.description}</h2>
						<h3>
							{data.value} <MdDeleteForever color='#c6c6c6' onClick={() => removeEntry(data)} />
						</h3>
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
		display: flex;
		justify-content: center;
		align-items: center;
		color: ${(props) => props.color};
	}
`;
