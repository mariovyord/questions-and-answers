const UserCard = ({ profile }) => {
	return (
		<div className='w-full'>
			<div className='bg-base-100 p-4 mb-2 rounded-lg shadow flex gap-2 w-full'>
				<div className="avatar">
					<div className="w-32 rounded">
						<img src={profile.imageUrl} alt="Portrait" />
					</div>
				</div>
				<div className=''>
					<h1 className='font-bold text-2xl'>{profile.firstName} {profile.lastName}</h1>
					<h2 className='italic opacity-80 text-sm'>@{profile.username}</h2>
					<h2 className=''>{profile.description}</h2>
				</div>
			</div>
		</div>
	)
}

export default UserCard;