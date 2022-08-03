import React from 'react'
import { BsGithub } from 'react-icons/bs';

export default function Footer() {
	return (
		<footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
			<div>
				<div className="grid grid-flow-col gap-4">
					<a target="_blank" rel="noreferrer" href="https://github.com/mariovyord/questions-and-answers">
						<BsGithub size={'30px'} />
					</a>
				</div>
			</div>
			<div>
				<p>Copyright © 2022 - Mario Yordanov</p>
			</div>
		</footer>
	)
}
