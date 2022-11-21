import { useContext, useEffect, useState } from 'react';

import { AiOutlineRollback } from 'react-icons/ai';
import { BASE_URL } from '../../constants/urls.js';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../components/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';
import { useNavigate } from 'react-router-dom';

export default function AddExpensePage() {
	const navigate = useNavigate();
	const { userInfo } = useContext(UserContext);
	const [form, setForm] = useState({ value: '', description: '', type: 'expense' });
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!localStorage.token) {
			navigate('/');
		}
	});

	function addExpense(e) {
		e.preventDefault();

		const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
		const body = { ...form };
		setLoading(true);

		axios
			.post(`${BASE_URL}/wallet`, body, config)
			.then((res) => {
				alert('Saída adicionada com sucesso!');
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
		<AddExpenseContainer>
			<Header>
				<h1>Nova saída</h1>
				<AiOutlineRollback color='#fff' size='1.5em' onClick={() => navigate('/mywallet')} />
			</Header>
			<form onSubmit={addExpense}>
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
				<button type='submit'>{loading ? <ThreeDots color='#ffffff' /> : 'Salvar entrada'}</button>
			</form>
		</AddExpenseContainer>
	);
}

const AddExpenseContainer = styled.div`
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
