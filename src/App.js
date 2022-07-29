import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import Navbar from './components/navigation/Navbar';
import AboutPage from './components/AboutPage/AboutPage';
import QuestionDetailsPage from './components/QuestionDetails/QuestionDetailsPage';
import Profile from './components/ProfilePage/ProfilePage';
import CirclesPage from './components/CirclesPage/CirclesPage';
import Auth from './components/auth/Auth';
import Signup from './components/auth/signup/Signup';
import PageNotFound from './components/common/PageNotFound';
import Feed from './components/feed/Feed';
import { NotificationProvider } from './contexts/NotificationContext';
import CircleDetails from './components/CircleDetails/CircleDetails';
import AnswerDetails from './components/AnswerDetails.js/AnswerDetails';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import QuestionsPage from './components/QuestionsPage/QuestionsPage';

function App() {
	return (
		<Router>
			<ErrorBoundary>
				<AuthProvider>
					<NotificationProvider>
						<header>
							<Navbar />
						</header>
						<div className='bg-base-200 min-h-[calc(100vh-294px)] w-full'>
							<main className="flex justify-center w-full " >
								<Routes>
									<Route path='/' element={<HomePage />} >
										<Route path="/" element={<Feed />} />
									</Route>
									<Route path='/questions' element={<QuestionsPage />} />
									<Route path='/questions/:id' element={<QuestionDetailsPage />} />
									<Route path='/profile/:_id' element={<Profile />} />
									<Route path='/answers/:_id' element={<AnswerDetails />} />
									<Route path='/circles' element={<CirclesPage />} />
									<Route path='/circles/:_id' element={<CircleDetails />} />
									<Route path='/auth/signup' element={<Signup />} />
									<Route path='/auth' element={<Auth />} />
									<Route path='/about' element={<AboutPage />} />
									<Route path="*" element={<PageNotFound />} />
								</Routes>
							</main>
						</div>
						<footer className='w-full'>
							<Footer />
						</footer>
					</NotificationProvider>
				</AuthProvider>
			</ErrorBoundary>
		</Router>
	);
}

export default App;
