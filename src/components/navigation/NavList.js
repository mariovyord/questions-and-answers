import { NavLink } from 'react-router-dom';
import { BsHouseDoor, BsPerson } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlineQuestionCircle, AiOutlineCheckCircle, AiOutlineLogout } from 'react-icons/ai';

export default function NavList({ isMobile, userData, handleLogout }) {

	const tooltipClasses = isMobile ? 'z-10' : 'tooltip tooltip-bottom z-10';
	const activeClassName = 'bg-primary';

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

			{userData ? userNav : null}

			<li>
				<NavLink to="/about" className={tooltipClasses} data-tip='About'>
					<AiOutlineInfoCircle size={'24px'} />
					{isMobile ? 'About' : ''}
				</NavLink>
			</li>
		</>
	)
}
