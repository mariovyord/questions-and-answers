import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnswerCard from '../cards/AnswerCard';
import SortSelect from '../common/SortSelect';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";

export default function QuestionDetails() {

	const [isOpen, setIsOpen] = useState(false);
	const [textValue, setTextValue] = useState("");

	const handleOnClear = (e) => {
		e.preventDefault();
		setTextValue('');
	}


	const swapAddAsnwerBtn = (e) => {
		setIsOpen(!isOpen);
	}

	return (
		<div className='grid grid-cols-5 gap-2 max-w-5xl p-2'>
			<div className='col-span-3 grid gap-2'>
				{/* Question */}
				<div className='p-3 bg-base-100 rounded-lg shadow'>
					<h1 className='font-bold text-2xl mb-2'>What is an example of a real-world problem that non-programmers solve with recursion?</h1>
					<p className='italic text-slate-500'>Circle: <Link className=' link-hover' to='/cicles/programming'>Programming</Link></p>
				</div>
				<div>
					<div className="collapse">
						<input onClick={() => swapAddAsnwerBtn()} type="checkbox" className='p-0 m-0' />
						<div className="collapse-title text-base font-medium btn btn-secondary w-full min-h-0 p-0">
							{isOpen ? 'Close' : 'Add Answer'}
						</div>
						<div className="collapse-content">
							<form>
								<div className="container" data-theme="cmyk">

									<MDEditor
										value={textValue}
										onChange={setTextValue}
										preview={'edit'}
										autoFocus={true}
										previewOptions={{
											rehypePlugins: [[rehypeSanitize]],
										}}
									/>

								</div>

								<div className='flex justify-end gap-4 my-2'>
									<button className='btn' onClick={handleOnClear}>Clear</button>
									<button className='btn btn-primary'>Submit</button>
								</div>
							</form>
							<div className="alert shadow-lg">
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
									<span>You can use <a href="https://www.markdownguide.org/" className='link'>markdown</a>  in writing your answer!</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Sort options */}
				<SortSelect />

				{/* Answers */}
				<AnswerCard />
			</div>
			<div className='col-span-2 p-3 flex flex-col gap-2'>
				<h2 className='font-bold text-xl'>Related questions</h2>
				<p>What are some examples of recursion in the real world?</p>
				<p>What are some examples of trolley problem in real world?</p>
				<p>What are some real-world problems that could be solved with programming/coding?</p>
				<p>What are the examples of recursion algorithms?</p>
				<p>Where can I find some real-world problems to solve by programming?</p>
				<p>How do I identify recursion in a programming problem?</p>
			</div>
		</div >
	)
}
