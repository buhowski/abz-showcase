import UserItem from './UserItem';
import userPhotoImg from '../../assets/media/photo-cover.svg';
import './Users.scss';

const usersData = [
	{
		userPhoto: userPhotoImg,
		userPhotoAlt: '',
		userName: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. ',
		userPosition:
			'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente, vitae.',
		userEmail: 'frontend_develop@gmail.com',
		userPhone: '+38 (098) 278 44 24',
	},
	{
		userPhoto: userPhotoImg,
		userPhotoAlt: 'user',
		userName: 'name',
		userPosition: 'pos',
		userEmail: 'email',
		userPhone: 'phone',
	},
	{
		userPhoto: userPhotoImg,
		userPhotoAlt: 'user',
		userName: 'name',
		userPosition: 'pos',
		userEmail: 'email',
		userPhone: 'phone',
	},
	{
		userPhoto: userPhotoImg,
		userPhotoAlt: 'user',
		userName: 'name',
		userPosition: 'pos',
		userEmail: 'email',
		userPhone: 'phone',
	},
	{
		userPhoto: userPhotoImg,
		userPhotoAlt: 'user',
		userName: 'name',
		userPosition: 'pos',
		userEmail: 'email',
		userPhone: 'phone',
	},
];

const Users = () => {
	return (
		<section className='users-section'>
			<div className='wrapper'>
				<h2 className='base-title' id='users'>
					Working with GET request
				</h2>

				<div className='users-container'>
					{usersData.map((user, index) => (
						<UserItem
							key={index}
							userPhoto={user.userPhoto}
							userPhotoAlt={user.userPhotoAlt}
							userName={user.userName}
							userPosition={user.userPosition}
							userEmail={user.userEmail}
							userPhone={user.userPhone}
						/>
					))}
				</div>

				<button className='users-more main-btn' type='button'>
					Show more
				</button>
			</div>
		</section>
	);
};

export default Users;
