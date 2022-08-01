import isGuest from '../../../hoc/isGuest';
import SignupForm from './SignupForm';

const Signup = () => {
	return (
		<div className='flex justify-center w-full p-2'>
			<div className='w-full sm:max-w-md p-8 bg-base-100 rounded-md shadow'>
				<h1 className='font-bold text-5xl text-center mb-8'>Sign up</h1>

				<SignupForm />

			</div>
		</div>
	)
}

export default isGuest(Signup);
