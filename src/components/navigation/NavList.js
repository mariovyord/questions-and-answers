import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { BsHouseDoor, BsPerson } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlineQuestionCircle, AiOutlineCheckCircle, AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { AuthContext } from '../../contexts/AuthContext';

export default function NavList({ isMobile }) {

	const tooltipClasses = isMobile ? 'z-10' : 'tooltip tooltip-bottom z-10';
	const activeClassName = 'bg-primary';

	const { userData, handleLogout } = useContext(AuthContext);

	const userNav = (
		<>
			<li>
				<NavLink to="/profile" className={tooltipClasses} data-tip='Profile'>
					<BsPerson size={'24px'} />
					{isMobile ? 'Profile' : ''}
				</NavLink>
			</li>
			<li>
				<button
					onClick={() => handleLogout()}
					className={tooltipClasses + ' text-error'}
					data-tip='Logout'>
					<AiOutlineLogout size={'24px'} />
					{isMobile ? 'Logout' : ''}
				</button>
			</li>
		</>
	);

	const guestNav = (
		<li>
			<NavLink to="/auth" className={tooltipClasses} data-tip='Login'>
				<AiOutlineLogin size={'24px'} />
				{isMobile ? 'Login' : ''}
			</NavLink>
		</li>
	)

	return (
		<>
			<li>
				<NavLink to="/"
					className={({ isActive }) => tooltipClasses + ' ' + (isActive ? activeClassName : '')}
					data-tip='Home'
				>
					<BsHouseDoor size={'24px'} />
					{isMobile ? 'Home' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/questions" className={tooltipClasses} data-tip='Questions'>
					<AiOutlineQuestionCircle size={'24px'} />
					{isMobile ? 'Questions' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/circles" className={tooltipClasses} data-tip='Circles'>
					<AiOutlineCheckCircle size={'24px'} />
					{isMobile ? 'Circles' : ''}
				</NavLink>
			</li>

			{userData ? userNav : guestNav}

			<li>
				<NavLink to="/about" className={tooltipClasses} data-tip='About'>
					<AiOutlineInfoCircle size={'24px'} />
					{isMobile ? 'About' : ''}
				</NavLink>
			</li>
		</>
	)
}
