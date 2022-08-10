import { useState } from 'react';
import UploadImageForm from '../forms/UploadImageForm';
import EditProfileForm from '../forms/EditProfileForm';

const EditProfile = ({ userData, profile, handleSetProfile }) => {
	const [showEditProfile, setShowEditProfile] = useState(false);

	return (
		<div>
			<button
				onClick={() => setShowEditProfile((x) => !x)}
				className='btn btn-primary btn-outline w-full mb-2'
			>
				{showEditProfile ? 'Close' : 'Edit Profile'}
			</button>
			{showEditProfile && <div className='flex flex-col gap-2 mb-4'>
				<div className='border border-primary rounded-lg p-4 bg-base-100 shadow'>
					<h3 className='font-bold text-2xl'>Profile picture</h3>
					<div className='py-4'>
						<UploadImageForm userId={userData._id} handleSetProfile={handleSetProfile} />
					</div>
				</div>
				<div className='border border-primary rounded-lg p-4 bg-base-100 shadow'>
					<h3 className='font-bold text-2xl'>Edit info</h3>
					<EditProfileForm profile={profile} handleSetProfile={handleSetProfile} />
				</div>
			</div>}
		</div>
	)
}

export default EditProfile