import { CgAdd, CgRemove } from 'react-icons/cg';
import { accentColor, baseColor, textColor } from '../../constants/colors.js';
import { useContext, useEffect, useState } from 'react';

import { BASE_URL } from '../../constants/urls.js';
import { GoSignOut } from 'react-icons/go';
import { ProgressBar } from 'react-loader-spinner';
import Records from './Records.js';
import UserContext from '../../components/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function MyWalletPage() {
	const navigate = useNavigate();
	const { setUserInfo } = useContext(UserContext);
	const [records, setRecords] = useState([]);
	const [balance, setBalance] = useState('');
	const [loading, setLoading] = useState(true);
	const [render, setRender] = useState(false);

	useEffect(() => {
		if (localStorage.token !== undefined) {
			setUserInfo({ name: localStorage.name, token: localStorage.token });
			const config = { headers: { Authorization: `Bearer ${localStorage.token}` } };
			axios
				.get(`${BASE_URL}/wallet`, config)
				.then((res) => {
					setRecords(res.data.wallet);
					setBalance(res.data.balance);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err.response.data);
					navigate('/');
				});
		} else {
			navigate('/');
		}
	}, [render]);

	function signOut() {
		if (window.confirm('Tem deseja que deseja deslogar?')) {
			localStorage.removeItem('name');
			localStorage.removeItem('token');
			navigate('/');
		}
	}

	return (
		<HomeContainer>
			<Header>
				<h1>Olá, {localStorage.name}</h1>
				<GoSignOut color='#fff' size='23px' onClick={signOut} />
			</Header>
			{loading ? (
				<RecordsContainer display={records.length === 0 ? 'true' : 'false'}>
					<span>
						<ProgressBar borderColor={baseColor} barColor={accentColor} />
					</span>
				</RecordsContainer>
			) : (
				<RecordsContainer display={records.length === 0 ? 'true' : 'false'}>
					<span>Não há registros de entrada ou saída</span>
					{records.length === 0 ? (
						''
					) : (
						<Records records={records} setRender={setRender} render={render} />
					)}
					<Balance
						display={records.length === 0 ? 'true' : 'false'}
						color={balance < 0 ? '#C70000' : '#03AC00'}>
						<h1>SALDO</h1>
						<h2>{Number(balance).toFixed(2).replace('.', ',')}</h2>
					</Balance>
				</RecordsContainer>
			)}
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
	margin-top: 10px;
	@media (min-width: 660px) {
		justify-content: flex-end;
	}
	h1 {
		font-weight: 700;
		@media (min-width: 660px) {
			margin-right: 50px;
		}
	}
	h2 {
		font-weight: 400;
		color: ${(props) => props.color};
		@media (min-width: 660px) {
			margin-right: 50px;
		}
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
