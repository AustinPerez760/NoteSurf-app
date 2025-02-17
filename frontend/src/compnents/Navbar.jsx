import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../compnents/cards/ProfileInfo';
import SearchBar from './SearchBar.jsx/SearchBar';

const Navbar = () => {
	const navigate = useNavigate;

	const onLogout = () => {
		navigate('/login');
	};

	return (
		<div className='bg-white flex items center justify-between px-6 py-2 drop-shadow '>
			<h2 className='test-xl font-medium text-black py-2'>NoteSurf</h2>

			<SearchBar />

			<ProfileInfo onLogout={onLogout} />
		</div>
	);
};

export default Navbar;
