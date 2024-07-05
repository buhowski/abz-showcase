import React, { useState, useEffect } from 'react';
import UserItem from './UserItem';
import userPhotoImg from '../../assets/media/photo-cover.svg';
import './Users.scss';

import { Form } from '../Form';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// Get all Users DATA
	const fetchUsers = async (page) => {
		setLoading(true);

		try {
			const response = await fetch(
				`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
			);

			const data = await response.json();

			if (data.success) {
				setUsers((prevUsers) => [...prevUsers, ...data.users]);
				setTotalPages(data.total_pages);
			} else {
				setError('Failed to fetch users.');
			}
		} catch (error) {
			setError('An error occurred while fetching users.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchUsers(page);
	}, [page]);

	const handleShowMore = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};

	const handleUserAdded = () => {
		setPage(1);
		fetchUsers(1);
	};

	return (
		<>
			<section className='users-section'>
				<div className='wrapper'>
					<h2 className='base-title' id='users'>
						Working with GET request
					</h2>

					{/* If Error happend */}
					{error && <p className='error'>{error}</p>}

					<div className='users-container'>
						{users.map((user, index) => (
							<UserItem
								key={index}
								userPhoto={user.photo || userPhotoImg}
								userPhotoAlt={user.name}
								userName={user.name}
								userPosition={user.position}
								userEmail={user.email}
								userPhone={user.phone}
							/>
						))}
					</div>

					{/* simple Preloader example */}
					{loading && <p>Loading...</p>}

					{page < totalPages && !loading && (
						<button
							className='users-more main-btn'
							type='button'
							onClick={handleShowMore}
						>
							Show more
						</button>
					)}
				</div>
			</section>

			{/* Form Section here */}
			<section className='form-section'>
				<div className='wrapper'>
					<h2 className='base-title' id='signUpForm'>
						Working with POST request
					</h2>

					<Form onUserAdded={handleUserAdded} />
				</div>
			</section>
		</>
	);
};

export default Users;
