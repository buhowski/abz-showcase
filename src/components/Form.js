import React, { useState, useEffect } from 'react';

export const Form = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		position: 'Frontend developer',
		photo: null,
	});

	const [errors, setErrors] = useState({});
	const [focused, setFocused] = useState({
		name: false,
		email: false,
		phone: false,
		photo: false,
	});

	const handleChange = (event) => {
		const { name, value, type, files } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: validateField(name, value),
		}));
	};

	const handleRadioChange = (event) => {
		setFormData((prevData) => ({
			...prevData,
			position: event.target.value,
		}));
	};

	const handleFocus = (event) => {
		const { name } = event.target;
		setFocused((prevFocused) => ({
			...prevFocused,
			[name]: true,
		}));
	};

	const handleBlur = (event) => {
		const { name } = event.target;
		setFocused((prevFocused) => ({
			...prevFocused,
			[name]: false,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			console.log('Form submitted successfully:', formData);
			setFormData({
				name: '',
				email: '',
				phone: '',
				position: 'Frontend developer',
				photo: null,
			});

			setErrors({});
		}
	};

	const validateField = (fieldName, value) => {
		let errorMessage = '';
		switch (fieldName) {
			case 'name':
				if (!value) {
					errorMessage = 'Name is required.';
				}
				break;

			case 'email':
				if (!value.match(/^([^\s@]+@[^\s@]+\.[^\s@]+)$/)) {
					errorMessage = 'Invalid email format.';
				}
				break;

			case 'phone':
				if (!value) {
					errorMessage = 'Phone number is required.';
				} else if (!/^\d+$/.test(value)) {
					errorMessage = 'Phone number must contain only digits.';
				}
				break;

			case 'photo':
				if (value && value.size > 1024 * 1024) {
					errorMessage = 'File size must be less than 1MB.';
				}
				break;

			default:
				break;
		}
		return errorMessage;
	};

	const validateForm = (formData) => {
		const validationErrors = {};
		for (const field in formData) {
			const error = validateField(field, formData[field]);
			if (error) {
				validationErrors[field] = error;
			}
		}
		return validationErrors;
	};

	const getLabelClassName = (fieldName) => {
		return focused[fieldName] || formData[fieldName] ? 'focused' : '';
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='input input--text'>
				<label htmlFor='name' className={getLabelClassName('name')}>
					Your name
				</label>
				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required
					aria-describedby='nameError'
				/>
				{errors.name && (
					<span id='nameError' className='input__error'>
						{errors.name}
					</span>
				)}
			</div>

			<div className='input input--text'>
				<label htmlFor='email' className={getLabelClassName('email')}>
					Email
				</label>
				<input
					type='email'
					id='email'
					name='email'
					value={formData.email}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required
					aria-describedby='emailError'
				/>
				{errors.email && (
					<span id='emailError' className='input__error'>
						{errors.email}
					</span>
				)}
			</div>

			<div className='input input--text'>
				<label htmlFor='phone' className={getLabelClassName('phone')}>
					Phone
				</label>
				<input
					type='tel'
					id='phone'
					name='phone'
					value={formData.phone}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					required
					pattern='\d*'
					aria-describedby='phoneError'
				/>
				{errors.phone ? (
					<span id='phoneError' className='input__error'>
						{errors.phone}
					</span>
				) : (
					<span className='input__help'>+38 (XXX) XXX - XX - XX</span>
				)}
			</div>

			<div className='form-checked'>
				<label>Select your position</label>

				<div className='input input--radio'>
					<input
						type='radio'
						id='option1'
						name='position'
						value='Frontend developer'
						checked={formData.position === 'Frontend developer'}
						onChange={handleRadioChange}
					/>
					<label htmlFor='option1'>Frontend developer</label>
				</div>
				<div className='input input--radio'>
					<input
						type='radio'
						id='option2'
						name='position'
						value='Backend developer'
						checked={formData.position === 'Backend developer'}
						onChange={handleRadioChange}
					/>
					<label htmlFor='option2'>Backend developer</label>
				</div>
				<div className='input input--radio'>
					<input
						type='radio'
						id='option3'
						name='position'
						value='Designer'
						checked={formData.position === 'Designer'}
						onChange={handleRadioChange}
					/>
					<label htmlFor='option3'>Designer</label>
				</div>
				<div className='input input--radio'>
					<input
						type='radio'
						id='option4'
						name='position'
						value='QA'
						checked={formData.position === 'QA'}
						onChange={handleRadioChange}
					/>
					<label htmlFor='option4'>QA</label>
				</div>
			</div>

			<div className='input input--file'>
				<label htmlFor='photo' className={getLabelClassName('photo')}>
					<span className='input-file__btn'>Upload</span>
					<span className='input-file__text'>Upload your photo</span>
				</label>
				<input
					type='file'
					id='photo'
					name='photo'
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
				{errors.photo && (
					<span id='fileError' className='input__error'>
						{errors.photo}
					</span>
				)}
			</div>

			<div className='form-action'>
				<button
					className={`main-btn ${Object.keys(errors).length === 0 ? '' : 'disabled'}`}
					type='submit'
					disabled={Object.keys(errors).length !== 0}
				>
					Sign up
				</button>
			</div>
		</form>
	);
};
