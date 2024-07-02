import React, { useState } from 'react';

export const Form = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		position: 'Frontend developer',
		photo: null,
	});

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		const { name, value, type, files } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: type === 'file' ? files[0] : value,
		}));

		// Perform basic validation on change (optional)
		setErrors((prevErrors) => ({
			...prevErrors,
			[name]: validateField(name, value),
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Validate all fields before submission
		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length === 0) {
			// Submit form data (e.g., send to server using fetch or Axios)
			console.log('Form submitted successfully:', formData);
			// Reset form
			setFormData({
				name: '',
				email: '',
				phone: '',
				position: 'Frontend developer',
				file: null,
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
				// Add phone number validation (consider using a library)
				if (!value) {
					errorMessage = 'Phone number is required.';
				}
				break;
			case 'radioOption':
				if (!value) {
					errorMessage = 'Please select an option.';
				}
				break;
			case 'file':
				// Add file size and type validation (optional)
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

	return (
		<form onSubmit={handleSubmit}>
			<div className='input input--text'>
				<label htmlFor='name'>Your name</label>

				<input
					type='text'
					id='name'
					name='name'
					value={formData.name}
					onChange={handleChange}
					required
					aria-describedby='nameError'
				/>

				{errors.name && (
					<span id='nameError' className='input__error'>
						{errors.name}
					</span>
				)}
			</div>

			<div>
				<label>Select your position</label>

				<div className='input input--radio'>
					<input
						type='radio'
						id='option1'
						name='radioOption'
						value='option1'
						checked={formData.position === 'Frontend developer'}
						onChange={handleChange}
					/>

					<label htmlFor='option1'>Frontend developer</label>
				</div>
			</div>

			<div className='input input--file'>
				<label htmlFor='file'>
					<span className='input-file__btn'>Upload</span>
					<span className='input-file__text'>Upload your photo</span>
				</label>

				<input type='file' id='file' name='file' onChange={handleChange} />

				{errors.file && (
					<span id='fileError' className='input__error'>
						{errors.file}
					</span>
				)}
			</div>

			<div className='form-action'>
				<button className='main-btn disabled' type='submit'>
					Sign up
				</button>
			</div>
		</form>
	);
};
