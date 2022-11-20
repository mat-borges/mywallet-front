import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddExpensePage from './pages/AddExpensePage/AddExpensePage.js';
import AddIncomePage from './pages/AddIncomePage/AddIncomePage.js';
import GlobalStyle from './assets/styles/GlobalStyle.js';
import HomePage from './pages/HomePage/HomePage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';

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
