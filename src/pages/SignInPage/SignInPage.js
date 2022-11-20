import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../../constants/urls.js';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';
import { useState } from 'react';

export default function SignInPage() {
	const navigate = useNavigate();
	const [logginIn, setLoggingIn] = useState(false);
	const [user, setUser] = useState({ email: '', password: '' });

	function signin(e) {
		e.preventDefault();

		setLoggingIn(true);
		axios
			.post(`${BASE_URL}/auth/sing-in`, user)
			.then((res) => {
				console.log(res);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('name', res.data.name);
				navigate('/home');
			})
			.catch((err) => {
				console.log(err);
				setLoggingIn(false);
			});
	}

	function handleForm(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	return (
		<SignInContainer>
			<h1>MyWallet</h1>
			<form onSubmit={signin}>
				<input
					type='email'
					placeholder='Email'
					name='email'
					required
					disabled={logginIn === true ? 'disabled' : ''}
					value={user.email}
					onChange={handleForm}
				/>
				<input
					type='password'
					placeholder='Senha'
					name='password'
					required
					disabled={logginIn === true ? 'disabled' : ''}
					value={user.password}
					onChange={handleForm}
				/>
				<button type='submit' disabled={logginIn === true ? 'disabled' : ''}>
					{logginIn === true ? <ThreeDots color='#ffffff' /> : 'Entrar'}
				</button>
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
			display: flex;
			justify-content: center;
			align-items: center;
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
