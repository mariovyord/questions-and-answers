import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/navigation/Navbar';
import About from './components/About';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
	return (
		<Router>
			<div className='bg-slate-200 h-full'>
				<header>
					<Navbar />
				</header>
				<main className="flex justify-center w-full" >
					<Routes>
						<Route path='/' exact element={<Home />} />
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
