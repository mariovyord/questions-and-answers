import { useState } from 'react';
import Modal from '../../common/Modal';
import AddQuestionForm from './AddQuestionForm';

const AddQuestionModal = () => {
	const [openModal, SetOpenModal] = useState(false);

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	return (
		<>
			<button onClick={() => handleModal()} className="btn btn-secondary modal-button">Ask question</button>
			{
				openModal && <Modal handleModal={handleModal} >
					<AddQuestionForm handleModal={handleModal} />
				</Modal>
			}
		</>
	)
}

export default AddQuestionModal;