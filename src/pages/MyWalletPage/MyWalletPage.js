import { CgAdd, CgRemove } from 'react-icons/cg';
import { useEffect, useState } from 'react';

import { BASE_URL } from '../../constants/urls.js';
import { GoSignOut } from 'react-icons/go';
import Records from './Records.js';
import axios from 'axios';
import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';
import { useNavigate } from 'react-router-dom';

export default function MyWalletPage() {
	const navigate = useNavigate();
	const [records, setRecords] = useState(['a']);

	useEffect(() => {
		// if (localStorage.token !== undefined) {
		const config = { headers: { Authorization: `Bearer ${localStorage.token}` } };
		axios
			.get(`${BASE_URL}/wallet`, config)
			.then((res) => {
				setRecords(res.data);
			})
			.catch((err) => {
				navigate('/');
				console.log(err.response.data);
			});
		// } else {
		// 	navigate('/');
		// }
	}, []);

	function signOut() {
		if (window.confirm('Tem deseja que deseja deslogar?')) {
			navigate('/');
		}
	}

	return (
		<HomeContainer>
			<Header>
				<h1>Olá, Fulano</h1>
				<GoSignOut color='#fff' size='23px' onClick={signOut} />
			</Header>
			<RecordsContainer display={records.length === 0 ? 'true' : 'false'}>
				<span>Não há registros de entrada ou saída</span>
				{records.length === 0 ? '' : <Records records={records} setRecords={setRecords} />}
				<Balance display={records.length === 0 ? 'true' : 'false'}>
					<h1>SALDO</h1>
					<h2>300,00</h2>
				</Balance>
			</RecordsContainer>
			<ButtonsBox>
				<button onClick={() => navigate('/addincome')}>
					<CgAdd color='#fff' size='22px' />
					Nova Entrada
				</button>
				<button onClick={() => navigate('/addexpense')}>
					<CgRemove color='#fff' size='22px' />
					Nova Saída
				</button>
			</ButtonsBox>
		</HomeContainer>
	);
}

const HomeContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin: 0 24px;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin: 25px 0;
	h1 {
		color: ${textColor};
		font-weight: 700;
		font-size: 26px;
		line-height: 30px;
	}
`;

const RecordsContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${(props) => (props.display === 'true' ? 'center' : 'space-between')};
	align-items: center;
	width: 100%;
	height: 70vh;
	border-radius: 5px;
	background-color: #fff;
	padding: 23px 12px 12px 12px;
	span {
		display: ${(props) => (props.display === 'true' ? 'initial' : 'none')};
		width: 180px;
		color: #868686;
		font-weight: 400;
		font-size: 20px;
		line-height: 23px;
		text-align: center;
	}
`;

const Balance = styled.div`
	display: ${(props) => (props.display === 'true' ? 'none' : 'flex')};
	justify-content: space-between;
	align-items: center;
	font-size: 17px;
	width: 100%;
	@media (min-width: 660px) {
		width: 40%;
	}
	h1 {
		font-weight: 700;
	}
	h2 {
		font-weight: 400;
		color: #03ac00;
	}
`;

const ButtonsBox = styled.div`
	display: flex;
	margin: 15px 0;
	button {
		:first-child {
			margin-right: 15px;
		}
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 155px;
		height: 115px;
		padding: 10px;
		font-size: 17px;
	}
`;
