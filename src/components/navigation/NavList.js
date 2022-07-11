import React from 'react'
import { NavLink } from 'react-router-dom';
import { BsHouseDoor, BsPerson } from 'react-icons/bs';
import { IoTrophyOutline } from 'react-icons/io5';
import { AiOutlineInfoCircle, AiOutlineQuestionCircle, AiOutlineCheckCircle, AiOutlineLogin } from 'react-icons/ai';

export default function NavList({ isMobile }) {

	const tooltipClasses = isMobile ? 'z-10' : 'tooltip tooltip-bottom z-10';

	return (
		<>
			<li>
				<NavLink to="/" className={tooltipClasses} data-tip='Home'>
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
			<li>
				<NavLink to="/leaderboard" className={tooltipClasses} data-tip='Leaderboard'>
					<IoTrophyOutline size={'24px'} />
					{isMobile ? 'Leaderboard' : ''}
				</NavLink></li>
			<li>
				<NavLink to="/profile" className={tooltipClasses} data-tip='Profile'>
					<BsPerson size={'24px'} />
					{isMobile ? 'Profile' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/auth" className={tooltipClasses} data-tip='Login'>
					<AiOutlineLogin size={'24px'} />
					{isMobile ? 'Login' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/about" className={tooltipClasses} data-tip='About'>
					<AiOutlineInfoCircle size={'24px'} />
					{isMobile ? 'About' : ''}
				</NavLink>
			</li>
		</>
	)
}
