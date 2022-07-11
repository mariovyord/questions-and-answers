import React, { useEffect, useRef, userRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function AddQuestionModal({ handleModal }) {

	return (
		<div onClick={() => handleModal()} className='overflow-hidden absolute w-full h-full bg-slate-400 bg-opacity-70 z-50 top-0 left-0 flex flex-col items-center justify-center p-3 '>
			<form onClick={(e) => e.stopPropagation()} className='card bg-base-100 p-3 w-full max-w-md' >
				<div className='flex justify-end'>
					<button onClick={() => handleModal()}><AiOutlineCloseCircle size='25px' /></button>
				</div>
				<div className='px-8 pb-8'>
					<label htmlFor="question" className='label font-bold text-2xl'>Add question</label>
					<input type="text" name='question' className='input input-bordered my-4 w-full' />
					<div className='flex justify-end gap-4 w-full'>
						<button onClick={() => handleModal()} className='btn btn-outline'>Cancel</button>
						<button className='btn btn-primary'>Submit</button>
					</div>
				</div>
			</form>
		</div >
	)
}
