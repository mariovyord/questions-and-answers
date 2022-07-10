import React from 'react'

export default function Signup() {
	return (
		<div className='flex justify-center w-full p-3 bg-base-100'>
			<div className='w-96'>
				<h1 className='font-bold text-5xl text-center my-8'>Sign up</h1>
				<form className='form-control max-w-sm'>
					<label htmlFor="username" className='label'>Username</label>
					<input type="text" className='input input-bordered' placeholder='Make it short and memorable.' />
					<label htmlFor="username" className='label'>First name</label>
					<input type="text" className='input input-bordered' placeholder='Your first name.' />
					<label htmlFor="username" className='label'>Last name</label>
					<input type="text" className='input input-bordered' placeholder='Your last name.' />
					<label htmlFor="username" className='label'>Short Description</label>
					<input type="text" className='input input-bordered' placeholder='Tell us something about yourself.' />

					<label htmlFor="username" className='label'>Password</label>
					<input type="password" className='input input-bordered' placeholder='Pick a secure password...' />
					<label htmlFor="username" className='label'>Repeat password</label>
					<input type="password" className='input input-bordered' placeholder='... and repeat if here.' />

					<input type="submit" className='btn btn-accent mt-6' placeholder='username' value={'Next'} />
				</form>
			</div>
		</div>
	)
}
