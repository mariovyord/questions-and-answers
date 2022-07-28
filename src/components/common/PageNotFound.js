import { Link } from 'react-router-dom';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'

export default function PageNotFound() {
	return (
		<div className='text-3xl text-center min-h-[calc(100vh-300px)] flex flex-col justify-center'>
			<div className='my-9 flex justify-center align-middle text-9xl font-bold '>
				<span className=''>4</span><HiOutlineQuestionMarkCircle className='animate-spin' /> <span className='text-9xl font-bold '>4</span>
			</div>
			<div className='my-9'>
				<span>Lost? There is no place like <Link to='/' className='link-hover text-primary font-bold'>home</Link></span>
			</div>
		</div>
	)
}
