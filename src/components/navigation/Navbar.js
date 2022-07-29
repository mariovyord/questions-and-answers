import React, { useContext } from 'react';
import NavList from './NavList';
import { Link } from 'react-router-dom';
import AddQuestionModal from './addQuestionModal/AddQuestionModal';
import { AuthContext } from '../../contexts/AuthContext';

export default function Navbar() {
	const { userData, handleLogout } = useContext(AuthContext);

	return (
		<div className='bg-base-100 flex justify-center'>
			<div className="navbar max-w-5xl">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex="0" className="btn btn-ghost lg:hidden">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
						</label>
						<ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
							<NavList userData={userData} isMobile={true} />
						</ul>
					</div>
					<Link to="/" className="btn btn-ghost normal-case text-2xl">Questions!</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal p-0">
						<NavList userData={userData} handleLogout={handleLogout} />
					</ul>
				</div>

				<div className="navbar-end">
					{userData
						? < AddQuestionModal />
						: <Link className="btn btn-secondary modal-button" to="/auth" >
							Login
						</Link>

					}
				</div>
			</div>
		</div >
	)
}
