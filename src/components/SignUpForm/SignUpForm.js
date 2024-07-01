import React, { useState } from 'react';
import './SignUpForm.scss';

const SignUpForm = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		position: 'Frontend developer',
		photo: null,
	});

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		setFormData({
			...formData,
			[name]: type === 'file' ? files[0] : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic here
		console.log('Form submitted:', formData);
	};

	return (
		<section className='form-section'>
			<div className='wrapper'>
				<h2 className='base-title' id='signUpForm'>
					Working with POST request
				</h2>

				<form onSubmit={handleSubmit}>
					<label htmlFor='name' className='label'>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							required
						/>

						<span className='input-label'>Your name</span>
						<span className='input-help'>+38 (XXX) XXX - XX - XX</span>
					</label>

					<label htmlFor='designer' className='label-radio'>
						<input
							type='radio'
							id='designer'
							name='position'
							value='Designer'
							checked={formData.position === 'Designer'}
							onChange={handleChange}
						/>
						<span className='label-radio__icon'></span>
						Designer
					</label>

					<div className='form-action'>
						<button className='main-btn disabled' type='submit'>
							Sign up
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default SignUpForm;
