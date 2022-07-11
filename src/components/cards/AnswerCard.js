import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'

export default function AnswerCard() {
	return (
		<div className='w-full bg-base-100 shadow p-4 rounded-lg'>

			{/* User info */}
			<div className='flex'>
				<div className="avatar">
					<div className="w-10 rounded-full">
						<img src="https://placeimg.com/192/192/people" alt='Profile' />
					</div>
				</div>
				<span className='font-bold flex ml-3'>
					<Link to="/user/1234" className='place-self-center link-hover'>Mario Yordanov</Link>
				</span>
			</div>

			{/* Question */}
			<div className='py-2'>
				<div className='font-bold'>
					<Link to="/question/1234" className='link-hover'>When did England become an island?</Link>
				</div>
				<div>
					<span className='text-xs text-gray-500'>Tags: <Link to="" className='link-hover'>history</Link>, <Link to="" className='link-hover'>geography</Link></span>
				</div>
			</div>

			{/* Answer */}
			<div>
				<p className='mb-1'>England isn't an island, but Britain is.</p>
				<p className='mb-1'>It didn't used to be, it used to be part of a region called Doggerland (yes, really):</p>
				<img className='mb-1' src="https://qph.fs.quoracdn.net/main-qimg-ee5cf0ccc770bba8093a9df564b6dd74-pjlq" alt="Map" />
				<p className='mb-1'>It became an island about 6500 BCE, while the island of what is now Dogger Bank lasted another 1000 years or so after that. It’s not a happy thought to wonder what happened to any people living there at the time.</p>
			</div>

			{/* Menu buttons */}
			<div className='flex justify-center gap-2 border-t-2 pt-3 mt-3'>
				<button><BsArrowUpCircle size={'25px'} /></button>
				<button><BsArrowDownCircle size={'25px'} /></button>
			</div>
		</div>
	)
}
