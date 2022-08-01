import { useEffect } from 'react'

export default function AboutPage() {
	useEffect(() => {
		document.title = "About"
	}, []);

	return (
		<div className='grid grid-cols-5 max-w-5xl py-3'>
			<div className='col-start-2 col-end-5'>
				<h1 className='text-4xl font-bold my-4'>Questions and Answers</h1>
				<p className='my-2'>Questions and Answers** is ReactJS web app where you can ask a question and have the other users answer. SoftUni Exam Project.</p>

				<img className='border-2 shadow rounded-lg' src="https://i.imgur.com/2AVjdkS.jpg" alt="screenshot" />

				<h2 className='text-3xl font-bold my-4'>App Feautures</h2>
				<p>Users can sign up, create circles (thematic sections), ask questions, answer questions, comment and vote on answers.</p>

				<h3 className='text-2xl font-bold my-4'>Pages</h3>
				<ul>
					<li className='list-disc'><span className='font-bold'>Home</span> - Answers feed, sorted by votes or by most recent.</li>
					<li className='list-disc'><span className='font-bold'>Questions</span> - Questions feed. Can be sorted by circle.</li>
					<li className='list-disc'><span className='font-bold'>Circles</span> - List of all main circles. User created circles can be loaded on demand. Includes option to create circle.</li>
					<li className='list-disc'><span className='font-bold'>Profile</span> - Profile page includes user data, questions and answers by the given user. User can upload picture or edit personal information. Questions can be also hidden from appearing in profile.</li>
					<li className='list-disc'><span className='font-bold'>Question details</span> - Includes form for adding answers and answers feed.</li>
					<li className='list-disc'><span className='font-bold'>Circle details</span> - Includes asnwers feed, recent questions and edit option for owners. Can be deleted only if there are no questions posted.</li>
					<li className='list-disc'><span className='font-bold'>Static pages</span> - Auth, Sign up, About, Contacts.</li>
				</ul>

				<h2 className='text-3xl font-bold my-4'>Tech stack</h2>
				<ul>
					<li className='list-disc'><a className='link-hover font-bold' href='https://reactjs.org/'>React</a> for UI</li>
					<li className='list-disc'><a className='link-hover font-bold' href='https://tailwindcss.com/'>Tailwind</a> for CSS utility</li>
					<li className='list-disc'><a className='link-hover font-bold' href='https://daisyui.com/'>daisyUI</a> for Tailwind CSS components and themes</li>
					<li className='list-disc'><a className='link-hover font-bold' href='https://formik.org/'>Formik</a> for React forms, without the tears</li>
					<li className='list-disc'><a className='link-hover font-bold' href='https://github.com/uiwjs/react-md-editor'>React MD Editor</a> for markdown</li>
					<li className='list-disc'><a className='link-hover font-bold' href='https://jestjs.io/'>Jest</a> for testing</li>
				</ul>
			</div>
		</div>
	)
}
