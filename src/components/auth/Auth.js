import React from 'react';
import { Link } from 'react-router-dom';

export default function Auth() {
	return (
		<div className='flex flex-col justify-center px-2 w-full max-w-5xl min-h-[calc(100vh-290px)]'>
			<div className='p-8'>
				<h1 className='font-bold text-6xl text-center mb-4'>Questions!</h1>
				<h3 className='font-bold italic text-xl text-center '>Ask a question and have the world help you out!</h3>
			</div>

			<div class="flex flex-col w-full lg:flex-row">



				<div class="flex flex-col justify-between bg-base-100 rounded-box place-items-center basis-1/2 w-full shadow-2xl">
					<div class="card w-full max-w-sm p-8">
						<form class="form-control">
							<h2 className='font-bold text-xl text-center'>Login</h2>
							<label htmlFor="username" className='label'>Username</label>
							<input type="text" className='input input-bordered' placeholder='Your username.' />
							<label htmlFor="password" className='label'>Password</label>
							<input type="text" placeholder="Your password." class="input input-bordered" />
							<button className="btn btn-primary mt-4">Login</button>
						</form>
					</div>
				</div>

				<div class="divider lg:divider-horizontal">OR</div>

				<div class="flex flex-col justify-between card bg-base-100 rounded-box place-items-center basis-1/2 w-full shadow-2xl p-8">
					<div className='mb-4  max-w-sm'>
						<h2 className='font-bold text-xl text-center'>Sign up</h2>
						<p className='text-center'>Fill a short form and start you journey in Questions!</p>
					</div>
					<div className='w-full px-8 max-w-sm'>
						<Link to='/auth/signup' className='btn btn-accent w-full'>Continue</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
