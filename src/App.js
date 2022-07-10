import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/navigation/Navbar';
import About from './components/About';
import Questions from './components/questions/Questions';
import Profile from './components/Profile';
import Circles from './components/Circles';
import Auth from './components/auth/Auth';

function App() {

	return (
		<Router>
			<div className='bg-base-200 h-full'>
				<header>
					<Navbar />
				</header>
				<main className="flex justify-center w-full " >
					<Routes>
						<Route path='/' exact element={<Home />} />
						<Route path='/questions' element={<Questions />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='/circles' element={<Circles />} />
						<Route path='/auth' element={<Auth />} />
						<Route path='/about' element={<About />} />
					</Routes>
				</main>
				<footer>
					<Footer />
				</footer>
			</div>
		</Router>
	);
}

export default App;
