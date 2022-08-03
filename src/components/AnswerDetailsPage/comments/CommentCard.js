import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useUserData from '../../../hooks/useUserData';
import { Formik } from 'formik';
import FormTextarea from '../../form/FormTextarea';
import { BsTrash } from 'react-icons/bs';
import { FiEdit, FiSave } from 'react-icons/fi';
import * as dataService from '../../../services/data.service';
import useNotificationContext from '../../../hooks/useNotificationContext';
import Modal from '../../common/Modal';



const CommentCard = ({ comment, handleChange }) => {
	const userData = useUserData();
	const [lockComment, setLockComment] = useState(true);
	const [openModal, SetOpenModal] = useState(false);

	const handleNotification = useNotificationContext();

	const handleUnlockEdit = () => {
		setLockComment(x => !x);
	}

	const handleModal = () => {
		SetOpenModal(!openModal);
	}

	const handleDelete = (_id) => {
		dataService.deleteComment(_id)
			.then(x => {
				handleChange((x) => {
					return x._id !== _id;
				})
				handleNotification('success', 'Comment deleted')
			})
			.catch(err => {
				handleNotification(err[0]?.message || 'Something went wrong')
			})
	}

	const handleSubmit = (values, { setSubmitting }) => {
		dataService.editComment(comment._id, { body: values.comment })
			.then(res => {
				handleChange((x) => {
					if (x._id == res.result._id) {
						x.body = res.result.body
						return x;
					}
					return x;
				})
				handleNotification('success', 'Comment updated')
				handleUnlockEdit();
			})
			.catch(err => {
				handleNotification(err[0]?.message || 'Something went wrong')
			})
			.finally(() => {
				setSubmitting(false);
			})
	}

	const validate = values => {
		const errors = {};
		if (!values.comment) {
			errors.comment = 'Required';
		} else if (values.comment.length < 6) {
			errors.comment = 'Must be 6 characters or more'
		} else if (values.comment.length > 200) {
			errors.comment = 'Must be 200 characters or less'
		}
		return errors;
	};

	return (<>
		<div className='w-full bg-base-100 shadow p-4 rounded-lg'>
			{/* User */}
			<div className='flex'>
				<div className="avatar">
					<div className="w-10 rounded-full">
						{/* Link to user profile */}
						<Link to={'/profile/' + comment.owner._id} className='place-self-center link-hover'>
							<img src={comment.owner.imageUrl} alt='Profile' />
						</Link>
					</div>
				</div>
				<span className='font-bold flex ml-3'>
					{/* Link to user profile */}
					<Link to={'/profile/' + comment.owner._id} className='place-self-center link-hover'>{comment.owner.firstName} {comment.owner.lastName}</Link>
				</span>
			</div>
			{/* Comment itself */}
			<Formik
				initialValues={{
					comment: comment.body,
				}}
				validate={validate}
				onSubmit={handleSubmit}
			>
				{formik => (
					<>
						<form onSubmit={formik.handleSubmit} className='form-control'>
							<div>
								{lockComment
									? <div className='w-full p-4'>
										<p>{comment.body}</p>
									</div>
									: <FormTextarea
										disabled={lockComment}
										label="Comment"
										id="comment"
										name="comment"
										type="text"
										placeholder="Your comment goes here..."
									/>}
							</div>
							<div>
								{userData && userData._id === comment.owner._id && <>
									<div>
										<button
											onClick={() => handleModal()}
											type="button"
											disabled={formik.isSubmitting}
											className='btn btn-ghost text-error tooltip tooltip-bottom tooltip-error'
											data-tip="Delete"
										>
											<BsTrash size={'20px'} />
										</button>
										{
											openModal && <Modal handleModal={handleModal} >
												<p className='font-bold text-xl mb-7'>Are you sure you want to delete comment?</p>
												<button onClick={() => handleDelete(comment._id)} type='button' className='btn btn-secondary w-1/3'>Yes</button>
												<button onClick={handleModal} type='button' className='btn btn-primary w-2/3'>No</button>
											</Modal>
										}
										<button
											type="button"
											disabled={formik.isSubmitting}
											className='btn btn-ghost tooltip tooltip-bottom tooltip-info'
											onClick={handleUnlockEdit}
											data-tip="Edit"
										>
											<FiEdit size={'20px'} />
										</button>
										{!lockComment && <button
											type="submit"
											disabled={formik.isSubmitting}
											className='btn btn-ghost tooltip tooltip-bottom tooltip-info'
											data-tip="Save"
										>
											<FiSave size={'20px'} />
										</button>}
									</div> </>
								}
							</div>
						</form>

					</>
				)}
			</Formik >
		</div>
	</>
	)
}

export default CommentCard;