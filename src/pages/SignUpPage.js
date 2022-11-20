import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { textColor } from '../constants/colors';

export default function SignUpPage() {
	const navigate = useNavigate();
	function signUp(e) {
		e.preventDefault();
		navigate('/');
	}
	return (
		<SignUpContainer>
			<h1>MyWallet</h1>
			<form onSubmit={signUp}>
				<input type='text' placeholder='Nome' required />
				<input type='email' placeholder='Email' required />
				<input type='password' placeholder='Senha' required />
				<input type='password' placeholder='Confirme a senha' required />
				<button type='submit'>Cadastrar</button>
			</form>
			<Link to='/'>Já tem uma conta? Entre agora!</Link>
		</SignUpContainer>
	);
}

const SignUpContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	form {
		display: flex;
		flex-direction: column;
		align-items: center;

		@media (min-width: 660px) {
			width: 50%;
		}
		input {
			width: 100%;
			margin: 0 25px;
			margin-bottom: 13px;
		}
		button {
			margin-bottom: 35px;
			width: 100%;
		}
	}
	h1 {
		font-family: 'Saira Stencil One', cursive;
		font-size: 32px;
		line-height: 50px;
		color: ${textColor};
		margin-bottom: 25px;
	}
`;
