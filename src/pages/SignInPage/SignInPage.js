import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import { BASE_URL } from '../../constants/urls.js';
import { ThreeDots } from 'react-loader-spinner';
import UserContext from '../../components/UserContext.js';
import axios from 'axios';
import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';

export default function SignInPage() {
	const navigate = useNavigate();
	const [logginIn, setLoggingIn] = useState(false);
	const [user, setUser] = useState({ email: '', password: '' });
	const [showPassword, setShowPassword] = useState(false);
	const { setUserInfo } = useContext(UserContext);

	useEffect(() => {
		if (localStorage.token) {
			setUserInfo({ token: localStorage.token, name: localStorage.name });
			navigate('/mywallet');
		}
	});

	function signin(e) {
		e.preventDefault();
		const body = { ...user, email: user.email.toLowerCase() };

		setLoggingIn(true);
		axios
			.post(`${BASE_URL}/auth/sign-in`, body)
			.then((res) => {
				setUserInfo(res.data);
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('name', res.data.name);
				navigate('/mywallet');
			})
			.catch((err) => {
				console.log(err.response);
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
					type={showPassword ? 'text' : 'password'}
					placeholder='Senha'
					name='password'
					required
					disabled={logginIn === true ? 'disabled' : ''}
					value={user.password}
					onChange={handleForm}
				/>
				<span>
					<input type='checkbox' id='showpassword' onChange={() => setShowPassword(!showPassword)} />
					<label htmlFor='showpassword'>Show Password</label>
				</span>
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
		span {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			color: #fff;
			height: 20px;
			width: 100%;
			margin: 10px;
			font-weight: 500;
		}
		input {
			width: 100%;
			margin: 0 25px;
			margin-bottom: 13px;
		}
		input[type='checkbox'] {
			height: 0.7em;
			width: 0.7em;
			margin: 0 10px;
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
