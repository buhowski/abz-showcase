import SuccessImg from '../../assets/media/success-image.svg';

const Success = () => {
	return (
		<section className='success'>
			<div className='wrapper'>
				<h2 className='base-title'>User successfully registered</h2>

				<div>
					<img src={SuccessImg} alt='Description' />
				</div>
			</div>
		</section>
	);
};

export default Success;
