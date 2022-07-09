import React from 'react'
import { NavLink } from 'react-router-dom';
import { BsHouseDoor, BsCardChecklist, BsPerson, BsBookmarks } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai'

export default function NavList({ isMobile }) {

	const tooltipClasses = isMobile ? '' : 'tooltip tooltip-bottom';

	return (
		<>
			<li>
				<NavLink to="/" className={tooltipClasses} data-tip='Home'>
					<BsHouseDoor size={'1.5rem'} />
					{isMobile ? 'Home' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/questions" className={tooltipClasses} data-tip='Questions'>
					<BsCardChecklist size={'1.5rem'} />
					{isMobile ? 'Questions' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/tags" className={tooltipClasses} data-tip='Tags'>
					<BsBookmarks size={'1.5rem'} />
					{isMobile ? 'Tags' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/profile" className={tooltipClasses} data-tip='Profile'>
					<BsPerson size={'1.5rem'} />
					{isMobile ? 'Profile' : ''}
				</NavLink></li>
			<li>
				<NavLink to="/about" className={tooltipClasses} data-tip='About'>
					<AiOutlineInfoCircle size={'1.5rem'} />
					{isMobile ? 'About' : ''}
				</NavLink></li>
		</>
	)
}
