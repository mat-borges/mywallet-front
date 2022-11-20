import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { textColor } from '../constants/colors';

export default function SignInPage() {
	const navigate = useNavigate();
	function signin(e) {
		e.preventDefault();
		navigate('/home');
	}
	return (
		<SignInContainer>
			<h1>MyWallet</h1>
			<form onSubmit={signin}>
				<input type='email' placeholder='Email' required />
				<input type='password' placeholder='Senha' required />
				<button type='submit'>Entrar</button>
			</form>
			<Link to='/signup'>Primeira vez? Cadastre-se!</Link>
		</SignInContainer>
	);
}

const SignInContainer = styled.div`
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
