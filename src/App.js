import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AddExpensePage from './pages/AddExpensePage/AddExpensePage.js';
import AddIncomePage from './pages/AddIncomePage/AddIncomePage.js';
import GlobalStyle from './assets/styles/GlobalStyle.js';
import MyWalletPage from './pages/MyWalletPage/MyWalletPage.js';
import SignInPage from './pages/SignInPage/SignInPage.js';
import SignUpPage from './pages/SignUpPage/SignUpPage.js';
import { UserProvider } from './components/UserContext.js';

export default function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<UserProvider>
				<Routes>
					<Route path='/' element={<SignInPage />} />
					<Route path='/signup' element={<SignUpPage />} />
					<Route path='/mywallet' element={<MyWalletPage />} />
					<Route path='/addincome' element={<AddIncomePage />} />
					<Route path='/addexpense' element={<AddExpensePage />} />
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}
