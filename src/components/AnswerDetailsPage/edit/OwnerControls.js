import { useState } from 'react';
import Modal from '../../common/Modal';
import EditAnswerForm from './EditAnswerForm';

const OwnerControls = ({
	data,
	handleSetNewBody,
	handleDelete,
	_id,
}) => {

	const [openModal, SetOpenModal] = useState(false);
	const [checked, setChecked] = useState(false);

	const handleChange = () => {
		setChecked(() => !checked)
	};

	const handleModal = () => {
		SetOpenModal(() => !openModal);
	}

	return (
		<>
			<div className='flex flex-col gap-2 w-full p-2'>
				<button onClick={() => handleModal()} className='btn btn-error w-full'>Delete</button>
				{
					openModal && <Modal handleModal={handleModal} >
						<p className='font-bold text-xl mb-7'>Are you sure you want to delete answer?</p>
						<button onClick={() => handleDelete()} type='button' className='btn btn-secondary w-1/3'>Yes</button>
						<button onClick={handleModal} type='button' className='btn btn-primary w-2/3'>No</button>
					</Modal>
				}

				<div className="collapse">
					<input
						checked={checked}
						onChange={handleChange}
						type="checkbox"
						className='p-0 m-0' />
					<div className="collapse-title text-base font-medium btn btn-secondary w-full min-h-0 p-0">
						{checked ? 'Close' : 'Edit Answer'}
					</div>
					<div className="collapse-content">

						<EditAnswerForm
							answerId={_id}
							handleSetNewBody={handleSetNewBody}
							question={{
								body: data.meta.question,
								owner: data._id,
								circle: data.circle,
								meta: {
									circle: data.meta.circle
								}
							}}
							handleChange={handleChange}
							values={data.body}
						/>

						<div className="alert shadow-lg">
							<div>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
								<span>You can use <a href="https://www.markdownguide.org/" className='link'>markdown</a>  in writing your answer!</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default OwnerControls