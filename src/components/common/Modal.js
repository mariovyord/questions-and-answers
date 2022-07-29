import { useEffect } from 'react';
import { enablePageScroll, disablePageScroll } from 'scroll-lock';

import { AiOutlineCloseCircle } from 'react-icons/ai';

const Modal = ({ handleModal, children }) => {
	useEffect(() => {
		disablePageScroll();
		return () => enablePageScroll();
	}, [])

	return (
		<div
			onClick={() => handleModal()}
			className='overflow-hidden fixed w-full h-screen bg-slate-400 bg-opacity-70 z-40 top-0 left-0 flex flex-col items-center justify-center p-3 '>
			<div onClick={(e) => e.stopPropagation()} className='card bg-base-100 p-3 w-full max-w-md' >
				<div className='flex justify-end'>
					<button onClick={() => handleModal()}><AiOutlineCloseCircle size='25px' /></button>
				</div>
				<div className='px-8 pb-8'>

					{children}

				</div>
			</div>
		</div >
	)
}

export default Modal