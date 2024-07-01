import { Logo } from '../../assets/media/Logo';
import { ScrolledLink } from '../structure-elements';
import './Header.scss';

const Header = () => {
	return (
		<header className='header'>
			<div className='wrapper header-wrapper'>
				<a href='/' className='logo'>
					{Logo}
				</a>

				<nav>
					<ScrolledLink href='#users' className='header__btn' text='Users' />

					<ScrolledLink href='#signUpForm' className='header__btn' text='Sign up' />
				</nav>
			</div>
		</header>
	);
};

export default Header;
