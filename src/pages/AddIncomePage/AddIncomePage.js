import { BASE_URL } from '../../constants/urls.js';
import axios from 'axios';
import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AddIncomePage() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ value: '', description: '', type: 'income' });

	function addIncome(e) {
		e.preventDefault();
		axios
			.post(`${BASE_URL}/wallet`, form)
			.then((res) => {
				console.log(res);
				navigate('/mywallet');
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function handleForm(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}
	console.log(form);

	return (
		<AddIncomeContainer>
			<Header>
				<h1>Nova entrada</h1>
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
				<button type='submit'>Salvar entrada</button>
			</form>
		</AddIncomeContainer>
	);
}

const AddIncomeContainer = styled.div`
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