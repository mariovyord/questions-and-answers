import React from 'react'
import { NavLink } from 'react-router-dom';
import { BsHouseDoor, BsCardChecklist, BsPerson, BsBookmarks } from 'react-icons/bs';
import { AiOutlineInfoCircle } from 'react-icons/ai'

export default function NavList({ isMobile }) {

	return (
		<>
			<li>
				<NavLink to="/">
					<BsHouseDoor size={'1.5rem'} />
					{isMobile ? 'Home' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/questions">
					<BsCardChecklist size={'1.5rem'} />
					{isMobile ? 'Questions' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/tags">
					<BsBookmarks size={'1.5rem'} />
					{isMobile ? 'Tags' : ''}
				</NavLink>
			</li>
			<li>
				<NavLink to="/profile">
					<BsPerson size={'1.5rem'} />
					{isMobile ? 'Profile' : ''}
				</NavLink></li>
			<li>
				<NavLink to="/about">
					<AiOutlineInfoCircle size={'1.5rem'} />
					{isMobile ? 'About' : ''}
				</NavLink></li>
		</>
	)
}
