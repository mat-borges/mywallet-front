import { Link, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../../constants/urls.js';
import { FiAlertTriangle } from 'react-icons/fi';
import { ThreeDots } from 'react-loader-spinner';
import axios from 'axios';
import styled from 'styled-components';
import { textColor } from '../../constants/colors.js';
import { useState } from 'react';

export default function SignUpPage() {
	const navigate = useNavigate();
	const [registering, setRegistering] = useState(false);
	const [user, setUser] = useState({ name: '', email: '', password: '', confirmPass: '' });
	const [validate, setValidate] = useState(true);

	function signUp(e) {
		e.preventDefault();
		setRegistering(true);
		if (user.password !== user.confirmPass) {
			setValidate(false);
			setRegistering(false);
			return;
		} else {
			setValidate(true);
		}
		axios
			.post(`${BASE_URL}/auth/sign-up`, user)
			.then(() => {
				alert('Usuário cadastrado com sucesso!');
				navigate('/');
			})
			.catch((err) => {
				console.log(err);
				setRegistering(false);
			});
	}

	function handleForm(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	return (
		<SignUpContainer
			backColor={validate === true ? '#fff' : '#eda8a8'}
			display={validate ? 'none' : 'flex'}>
			<h1>MyWallet</h1>
			<form onSubmit={signUp}>
				<input
					name='name'
					type='text'
					placeholder='Nome'
					required
					disabled={registering === true ? 'disabled' : ''}
					value={user.name}
					onChange={handleForm}
				/>
				<input
					name='email'
					type='email'
					placeholder='Email'
					required
					disabled={registering === true ? 'disabled' : ''}
					value={user.email}
					onChange={handleForm}
				/>
				<input
					name='password'
					type='password'
					placeholder='Senha'
					required
					disabled={registering === true ? 'disabled' : ''}
					value={user.password}
					onChange={handleForm}
				/>
				<input
					name='confirmPass'
					type='password'
					placeholder='Confirme a senha'
					required
					disabled={registering === true ? 'disabled' : ''}
					value={user.confirmPass}
					onChange={handleForm}
				/>
				<span>
					<FiAlertTriangle color='#ff3333' />
					<p>As senhas devem ser iguais</p>
				</span>
				<button type='submit'>
					{registering === true ? <ThreeDots color='#ffffff' /> : 'Cadastrar'}
				</button>
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
		span {
			display: ${(props) => props.display};
			justify-content: flex-start;
			align-items: center;
			width: 100%;
			margin-bottom: 10px;
			color: #ff3333;
			p {
				display: ${(props) => props.display};
				margin-left: 5px;
			}
		}
		input {
			width: 100%;
			margin: 0 25px;
			margin-bottom: 13px;
			background-color: #fff;
			:nth-child(3),
			:nth-child(4) {
				background-color: ${(props) => props.backColor};
			}
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
