import React from 'react'
import { NavLink } from 'react-router-dom';
import { BsHouseDoor, BsCardChecklist, BsPerson, BsBookmarks } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai'

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
					<BsCardChecklist size={'24px'} />
					{isMobile ? 'Questions' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/profile" className={tooltipClasses} data-tip='Profile'>
					<BsPerson size={'24px'} />
					{isMobile ? 'Profile' : ''}
				</NavLink></li>
			<li>
				<NavLink to="/about" className={tooltipClasses} data-tip='About'>
					<AiOutlineInfoCircle size={'24px'} />
					{isMobile ? 'About' : ''}
				</NavLink></li>
		</>
	)
}
