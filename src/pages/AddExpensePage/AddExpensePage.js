import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';
import { useNavigate } from 'react-router-dom';

export default function AddExpensePage() {
	const navigate = useNavigate();
	function addExpense(e) {
		e.preventDefault();
		navigate('/home');
	}
	return (
		<AddExpenseContainer>
			<Header>
				<h1>Nova saída</h1>
			</Header>
			<form onSubmit={addExpense}>
				<input type='number' step='0.01' name='quantity' min='0' placeholder='Valor' />
				<input type='text' placeholder='Descrição' />
				<button type='submit'>Salvar saída</button>
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
