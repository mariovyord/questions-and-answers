import React, { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import Modal from '../../common/Modal';
import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';

const LogoutBtn = ({ isMobile }) => {
	const [openModal, SetOpenModal] = useState(false);
	const { handleLogout } = useContext(AuthContext)

	const handleModal = () => {
		SetOpenModal(!openModal);
	}
	const tooltipClasses = isMobile ? 'z-10' : 'tooltip tooltip-bottom z-10';

	return (
		<>
			<li>
				<button
					onClick={() => handleModal()}
					className={tooltipClasses + ' text-error'}
					data-tip='Logout'>
					<AiOutlineLogout size={'24px'} />
					{isMobile ? 'Logout' : ''}
				</button>
			</li>
			{
				openModal && <Modal handleModal={handleModal} >
					<p className='font-bold text-xl mb-7'>Are you sure you want to logout?</p>
					<button onClick={() => handleLogout()} type='button' className='btn btn-secondary w-1/3'>Yes</button>
					<button onClick={handleModal} type='button' className='btn btn-primary w-2/3'>No</button>
				</Modal>
			}
		</>
	)
}

export default LogoutBtn