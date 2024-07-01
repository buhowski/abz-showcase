import heroImg from '../../assets/media/hero.jpg';
import { ScrolledLink } from '../structure-elements';
import './Hero.scss';

const Hero = () => {
	return (
		<section className='hero'>
			<div className='wrapper'>
				<img className='hero__img' src={heroImg} alt='description' />

				<div className='hero-info'>
					<h1 className='hero-info__title base-title'>
						Test assignment for front-end developer
					</h1>

					<p className='hero-info__text'>
						What defines a good front-end developer is one that has skilled knowledge of
						HTML, CSS, JS with a vast understanding of User design thinking as they'll
						be building web interfaces with accessibility in mind. They should also be
						excited to learn, as the world of Front-End Development keeps evolving.
					</p>

					<ScrolledLink href='#signUpForm' className='' text='Sign up' />
				</div>
			</div>
		</section>
	);
};

export default Hero;
