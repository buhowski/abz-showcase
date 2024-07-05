import React, { useState, useEffect } from 'react';

export const Form = ({ onUserAdded }) => {
	// State hooks for managing form data, errors, focus states, submission state, positions, and token
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		position_id: '',
		photo: null,
	});

	const [errors, setErrors] = useState({}); // State for form validation errors
	const [focused, setFocused] = useState({
		// State for tracking focus state of form inputs
		name: false,
		email: false,
		phone: false,
		photo: false,
	});
	const [submitting, setSubmitting] = useState(false); // State for submission loading state
	const [positions, setPositions] = useState([]); // State for storing available positions

	useEffect(() => {
		fetchToken(); // Fetch API token when component mounts
		fetchPositions(); // Fetch available positions when component mounts
	}, []);

	// Function to fetch available positions from the API
	const fetchPositions = async () => {
		try {
			const response = await fetch(
				'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
			);
			const data = await response.json();
			if (response.ok && data.success) {
				setPositions(data.positions); // Update state with fetched positions
			} else {
				throw new Error('Failed to fetch positions.'); // Throw error if fetching positions fails
			}
		} catch (error) {
			console.error('An error occurred while fetching positions:', error.message); // Log error to console
		}
	};

	// Function to fetch a new API token
	const fetchToken = async () => {
		try {
			const response = await fetch(
				'https://frontend-test-assignment-api.abz.agency/api/v1/token'
			);
			const data = await response.json();
			if (response.ok && data.success) {
			} else {
				throw new Error('Failed to fetch token.'); // Throw error if fetching token fails
			}
		} catch (error) {
			console.error('An error occurred while fetching token:', error.message); // Log error to console
		}
	};

	// Function to handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault(); // Prevent default form submission behavior

		const validationErrors = validateForm(formData); // Validate form data
		setErrors(validationErrors); // Set validation errors state

		if (Object.keys(validationErrors).length === 0) {
			// If no validation errors
			setSubmitting(true); // Set submission loading state to true
			try {
				const token = await fetchToken(); // Fetch a new API token
				const formDataToSend = new FormData();
				for (const key in formData) {
					formDataToSend.append(key, formData[key]); // Append form data to FormData object
				}

				// Send POST request to submit form data to the API
				const response = await fetch(
					'https://frontend-test-assignment-api.abz.agency/api/v1/users',
					{
						method: 'POST',
						headers: {
							Token: token, // Include API token in request headers
						},
						body: formDataToSend, // Send FormData object as request body
					}
				);

				const data = await response.json(); // Parse response JSON

				if (response.ok && data.success) {
					// If API request succeeds
					// Prepare new user data from API response
					const newUser = {
						id: data.user.id,
						name: data.user.name,
						email: data.user.email,
						phone: data.user.phone,
						position_id: data.user.position_id,
						photo: data.user.photo,
					};

					onUserAdded(newUser); // Notify parent component of new user addition

					// Reset form fields and errors
					setFormData({
						name: '',
						email: '',
						phone: '',
						position_id: '',
						photo: null,
					});
					setErrors({});
				} else {
					// Handle API errors
					if (data.fails) {
						const apiErrors = Object.values(data.fails).flat().join(', ');
						// Set form-level error state with API errors
						setErrors({ form: apiErrors });
					} else {
						// Set generic form submission error
						setErrors({ form: 'Failed to submit form.' });
					}
				}
			} catch (error) {
				// Log submission error to console
				console.error('An error occurred while submitting the form:', error.message);
				// Set generic form submission error
				setErrors({ form: 'An error occurred while submitting the form.' });
			} finally {
				// Reset submission loading state to false
				setSubmitting(false);
			}
		}
	};

	// Function to handle input field changes
	const handleChange = (event) => {
		const { name, value, type, files } = event.target;
		setFormData((prevData) => ({
			...prevData,
			// Update form data based on input type
			[name]: type === 'file' ? files[0] : value,
		}));

		setErrors((prevErrors) => ({
			...prevErrors,
			// Validate field and set error state
			[name]: validateField(name, value),
		}));
	};

	// Function to handle radio input changes
	const handleRadioChange = (event) => {
		setFormData((prevData) => ({
			...prevData,
			// Update selected position based on radio input
			position_id: event.target.value,
		}));
	};

	// Function to handle input focus
	const handleFocus = (event) => {
		const { name } = event.target;
		setFocused((prevFocused) => ({
			...prevFocused,
			// Update focus state to true for the specific input
			[name]: true,
		}));
	};

	// Function to handle input blur
	const handleBlur = (event) => {
		const { name } = event.target;
		setFocused((prevFocused) => ({
			...prevFocused,
			// Update focus state to false for the specific input
			[name]: false,
		}));
	};

	// Function to validate individual form field
	const validateField = (fieldName, value) => {
		let errorMessage = '';

		switch (fieldName) {
			case 'name':
				if (!value.trim()) {
					// Validate name field is not empty
					errorMessage = 'Name is required.';
				}
				break;

			case 'email':
				if (!value.match(/^([^\s@]+@[^\s@]+\.[^\s@]+)$/)) {
					errorMessage = 'Invalid email format.'; // Validate email format
				}
				break;

			case 'phone':
				if (!value) {
					errorMessage = 'Phone number is required.'; // Validate phone number is not empty
				} else if (!/^\+.+$/.test(value)) {
					errorMessage = 'Phone number must start with a + (plus) and digits only.'; // Validate phone number format
				}
				break;

			case 'photo':
				if (value) {
					if (value.size > 1024 * 1024) {
						errorMessage = 'File size must be less than 1MB.'; // Validate file size
					}
				}
				break;

			default:
				break;
		}

		// Return validation error message
		return errorMessage;
	};

	// Function to validate entire form data
	const validateForm = (formData) => {
		const validationErrors = {};
		for (const field in formData) {
			// Validate each field in form data
			const error = validateField(field, formData[field]);
			if (error) {
				// Set validation error for each field
				validationErrors[field] = error;
			}
		}
		// Return all validation errors
		return validationErrors;
	};

	// Function to get class name for input label based on focus or input value
	const getLabelClassName = (fieldName) => {
		// Determine label class based on input focus or value
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
				{positions.map((position) => (
					<div className='input input--radio' key={position.id}>
						<input
							type='radio'
							id={`position_${position.id}`}
							name='position_id'
							value={position.id}
							onChange={handleRadioChange}
						/>
						<label htmlFor={`position_${position.id}`}>{position.name}</label>
					</div>
				))}
			</div>

			<div className='input input--file'>
				<label htmlFor='photo' className={getLabelClassName('photo')}>
					<span className='input-file__btn'>Upload</span>
					<span className='input-file__text'>
						{formData.photo ? formData.photo.name : 'Upload your photo'}
					</span>
				</label>
				<input
					type='file'
					id='photo'
					name='photo'
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					accept='.png, .jpg, .jpeg'
				/>
				{errors.photo && (
					<span id='fileError' className='input__error'>
						{errors.photo}
					</span>
				)}
			</div>

			<div className='form-action'>
				<button className={`main-btn`} type='submit' disabled={submitting}>
					Sign up
				</button>
			</div>

			{errors.form && <div className='form__error'>{errors.form}</div>}
		</form>
	);
};

export default Form;
