import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { AiOutlineRollback } from 'react-icons/ai';
import { BASE_URL } from '../../constants/urls.js';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../components/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';

export default function EditRecordPage() {
	const navigate = useNavigate();
	const location = useLocation();

	const { userInfo, setUserInfo } = useContext(UserContext);
	const [form, setForm] = useState({
		description: location.state.data.description,
		value: location.state.data.value,
		type: location.state.data.type,
	});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!localStorage.token) {
			navigate('/');
		} else if (!userInfo.token) {
			setUserInfo({ name: localStorage.name, token: localStorage.token });
			navigate('/mywallet');
		}
	}, []);

	function addIncome(e) {
		e.preventDefault();
		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		const body = { ...form, value: Number(form.value).toFixed(2) };
		setLoading(true);
		const id = location.state.data._id;

		axios
			.put(`${BASE_URL}/wallet/${id}`, body, config)
			.then((res) => {
				alert(`Registro editado com sucesso!`);
				setLoading(false);
				navigate('/mywallet');
			})
			.catch((err) => {
				alert(err.response.data.message);
				setLoading(false);
			});
	}

	function handleForm(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	return (
		<EditRecordContainer>
			<Header>
				<h1>Editar {location.state.data.type === 'income' ? 'Entrada' : 'Saída'}</h1>
				<AiOutlineRollback color='#fff' size='1.5em' onClick={() => navigate('/mywallet')} />
			</Header>
			<form onSubmit={addIncome}>
				<input
					name='value'
					type='number'
					placeholder='Valor'
					required
					value={form.value}
					onChange={handleForm}
				/>
				<input
					name='description'
					type='text'
					placeholder='Descrição'
					required
					value={form.description}
					onChange={handleForm}
				/>
				<button type='submit'>
					{loading ? (
						<ThreeDots color='#ffffff' />
					) : (
						`Atualizar ${location.state.data.type === 'income' ? 'Entrada' : 'Saída'}`
					)}
				</button>
			</form>
		</EditRecordContainer>
	);
}

const EditRecordContainer = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-start;
	margin: 0 24px;
	height: 100vh;
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		input {
			margin-bottom: 15px;
			width: 100%;
		}
		button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
		}
	}
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
