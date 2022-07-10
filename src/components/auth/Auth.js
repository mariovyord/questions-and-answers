import React from 'react'

export default function Auth() {
	return (
		<div className='flex flex-col justify-center px-2 w-full max-w-5xl min-h-[calc(100vh-100px)]'>
			<div className='p-8 px-4'>
				<h1 className='font-bold text-6xl text-center mb-4'>Questions!</h1>
				<h3 className='font-bold italic text-xl text-center '>Ask a question and have the world help you out!</h3>
			</div>

			<div class="flex flex-col w-full lg:flex-row">



				<div class="flex flex-col justify-between bg-base-100 rounded-box place-items-center basis-1/2 w-full shadow-2xl">
					<div class="card w-full max-w-sm">
						<form class="card-body">
							<h2 className='font-bold text-xl text-center'>Login</h2>
							<label class="label">
								<span class="label-text">Username</span>
							</label>
							<input type="text" placeholder="username" class="input input-bordered" />
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input type="text" placeholder="password" class="input input-bordered" />
							<button className="btn btn-primary">Login</button>
						</form>
					</div>
				</div>

				<div class="divider lg:divider-horizontal">OR</div>

				<div class="flex flex-col justify-between card bg-base-100 rounded-box place-items-center basis-1/2 w-full shadow-2xl p-8">
					<div className='mb-4'>
						<h2 className='font-bold text-xl text-center'>Sign up</h2>
						<p className='text-center'>Fill a short form and start you journey in Questions!</p>
					</div>
					<button className='btn btn-accent'>Continue</button>
				</div>

			</div>
		</div>
	)
}
