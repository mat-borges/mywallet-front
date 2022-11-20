import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddExpensePage from './pages/AddExpensePage.js';
import AddIncomePage from './pages/AddIncomePage.js';
import GlobalStyle from './assets/styles/GlobalStyle.js';
import HomePage from './pages/HomePage.js';
import SignInPage from './pages/SignInPage.js';
import SignUpPage from './pages/SignUpPage.js';

export default function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<Routes>
				<Route path='/' element={<SignInPage />} />
				<Route path='/signup' element={<SignUpPage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/addincome' element={<AddIncomePage />} />
				<Route path='/addexpense' element={<AddExpensePage />} />
			</Routes>
		</BrowserRouter>
	);
}
