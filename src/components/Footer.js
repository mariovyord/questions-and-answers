import React from 'react'
import { Link } from 'react-router-dom';
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
	return (
		<footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
			<div className="grid grid-flow-col gap-4">
				<Link to="/about" className="link link-hover">About</Link>
				<Link to="/contact" className="link link-hover">Contact</Link>
			</div>
			<div>
				<div className="grid grid-flow-col gap-4">
					<a href="https://github.com/mariovyord/questions-and-answers">
						<BsGithub size={'2rem'} />
					</a>
				</div>
			</div>
			<div>
				<p>Copyright © 2022 - By Mario Yordanov</p>
			</div>
		</footer>
	)
}
