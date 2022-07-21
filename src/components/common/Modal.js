import { useEffect } from 'react';
import { enablePageScroll, disablePageScroll } from 'scroll-lock';

import { AiOutlineCloseCircle } from 'react-icons/ai';

const Modal = ({ contents, handleSubmit, handleModal, children }) => {
	useEffect(() => {
		disablePageScroll();
		return () => enablePageScroll();
	}, [])

	return (
		<div onClick={() => handleModal()} className='overflow-hidden absolute w-full h-full bg-slate-400 bg-opacity-70 z-50 top-0 left-0 flex flex-col items-center justify-center p-3 '>
			<form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} className='card bg-base-100 p-3 w-full max-w-md' >
				<div className='flex justify-end'>
					<button onClick={() => handleModal()}><AiOutlineCloseCircle size='25px' /></button>
				</div>
				<div className='px-8 pb-8'>
					<label htmlFor="question" className='label font-bold text-2xl'>{contents.title}</label>

					{children}

					<div className='flex justify-end gap-4 w-full mt-4'>
						<button type="button" onClick={() => handleModal()} className='btn btn-outline'>Cancel</button>
						<button type="submit" className='btn btn-primary'>{contents.button}</button>
					</div>
				</div>
			</form>
		</div >
	)
}

export default Modal