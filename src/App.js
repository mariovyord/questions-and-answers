import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';

import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/navigation/Navbar';
import About from './components/About';
import Questions from './components/Questions';
import QuestionDetails from './components/QuestionDetails';
import Profile from './components/Profile';
import Circles from './components/Circles';
import Auth from './components/auth/Auth';
import Signup from './components/auth/Signup';
import PageNotFound from './components/PageNotFound';
import useLocalStorage from './components/hooks/useLocalStorage';
import { logout } from './services/auth.service';

function App() {
	const [userData, setUserData] = useLocalStorage('userData');

	// TODO Move auth logic out of App
	const handleLogin = (authData) => {
		setUserData(authData);
	}
	const handleLogout = () => {
		// TODO Add modal
		const confirmation = window.confirm('Are you sure?');
		if (confirmation) {
			const refreshToken = userData.refreshToken;

			logout(refreshToken)
			setUserData(undefined);
		}
	}

	return (
		<AuthContext.Provider value={{ userData, handleLogin, handleLogout }}>
			<Router>
				<div className='bg-base-200 min-h-screen'>
					<header>
						<Navbar />
					</header>
					<main className="flex justify-center w-full " >
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/questions' element={<Questions />} />
							<Route path='/questions/:id' element={<QuestionDetails />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/circles' element={<Circles />} />
							<Route path='/auth/signup' element={<Signup />} />
							<Route path='/auth' element={<Auth />} />
							<Route path='/about' element={<About />} />
							<Route path="*" element={<PageNotFound />} />
						</Routes>
					</main>
					<footer>
						<Footer />
					</footer>
				</div>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
