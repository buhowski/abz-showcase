import './App.scss';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Users from './components/Users/Users';
import SignUpForm from './components/SignUpForm/SignUpForm';

const App = () => {
	return (
		<main className='page'>
			<div className='container'>
				<Header />
				<Hero />
				<Users />
				<SignUpForm />
			</div>
		</main>
	);
};

export default App;
