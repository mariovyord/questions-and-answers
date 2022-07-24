import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/navigation/Navbar';
import About from './components/About';
import Questions from './components/Questions';
import QuestionDetails from './components/QuestionDetails/QuestionDetails';
import Profile from './components/Profile';
import Circles from './components/Circles';
import Auth from './components/auth/Auth';
import Signup from './components/auth/signup/Signup';
import PageNotFound from './components/PageNotFound';
import Feed from './components/feed/Feed';
import { NotificationProvider } from './contexts/NotificationContext';
import CircleDetails from './components/CircleDetails/CircleDetails';

function App() {
	return (
		<AuthProvider>
			<NotificationProvider>
				<Router>
					<header>
						<Navbar />
					</header>
					<div className='bg-base-200 min-h-[calc(100vh-294px)]'>
						<main className="flex justify-center w-full " >
							<Routes>
								<Route path='/' element={<Home />} >
									<Route path="/" element={<Feed />} />
								</Route>
								<Route path='/questions' element={<Questions />} />
								<Route path='/questions/:id' element={<QuestionDetails />} />
								<Route path='/profile/:_id' element={<Profile />} />
								<Route path='/circles' element={<Circles />} />
								<Route path='/circles/:_id' element={<CircleDetails />} />
								<Route path='/auth/signup' element={<Signup />} />
								<Route path='/auth' element={<Auth />} />
								<Route path='/about' element={<About />} />
								<Route path="*" element={<PageNotFound />} />
							</Routes>
						</main>
					</div>
					<footer className='b-0 w-full'>
						<Footer />
					</footer>
				</Router>
			</NotificationProvider>
		</AuthProvider>
	);
}

export default App;
