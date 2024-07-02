import { Form } from '../Form';

import './SignUpForm.scss';

const SignUpForm = () => {
	return (
		<section className='form-section'>
			<div className='wrapper'>
				<h2 className='base-title' id='signUpForm'>
					Working with POST request
				</h2>

				<Form />
			</div>
		</section>
	);
};

export default SignUpForm;
