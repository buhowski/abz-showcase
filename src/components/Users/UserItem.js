const UserItem = ({
	userPhoto,
	userPhotoAlt,
	userName,
	userPosition,
	userEmail,
	userPhone,
}) => {
	return (
		<div className='user-item'>
			<div className='user-item__photo'>
				<img src={userPhoto} alt={userPhotoAlt} />
			</div>

			<p className='user-item__name'>{userName}</p>

			<p className='user-item__position'>{userPosition}</p>

			<p className='user-item__email'>{userEmail}</p>

			<p className='user-item__phone'>{userPhone}</p>
		</div>
	);
};

export default UserItem;
