import { BASE_URL } from '../../constants/urls';
import { MdDeleteForever } from 'react-icons/md';
import UserContext from '../../components/UserContext';
import axios from 'axios';
import styled from 'styled-components';
import { useContext } from 'react';

export default function Records({ records, render, setRender }) {
	const { userInfo } = useContext(UserContext);
	function removeEntry(data) {
		const id = data._id;
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		if (window.confirm('Você tem certeza que deseja deletar esse registro?')) {
			axios
				.delete(`${BASE_URL}/wallet/${id}`, config)
				.then((res) => {
					setRender(!render);
					alert('Registro deletado com sucesso');
				})
				.catch((err) => {
					console.log(err.response);
				});
		}
	}
	return (
		<RecordsBox>
			{records.map((data, i) => {
				return (
					<Record key={i} color={data.type === 'income' ? '#03AC00' : '#C70000'}>
						<h1>{data.date}</h1>
						<h2>{data.description}</h2>
						<h3>{data.value.replace('.', ',')}</h3>
						<MdDeleteForever color='#c6c6c6' size='18px' onClick={() => removeEntry(data)} />
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
		display: flex;
		justify-content: flex-start;
		width: 50%;
		color: #000;
		@media (min-width: 660px) {
			width: 70%;
		}
	}
	h3 {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		color: ${(props) => props.color};
		width: 20%;
	}
`;
