import { useNavigate } from 'react-router-dom';
import ProfileInfo from '../compnents/cards/ProfileInfo';
import SearchBar from './SearchBar.jsx/SearchBar';
import { useState } from 'react';

const Navbar = ({ userInfo }) => {
	const [searchQuery, setSearchQuery] = useState('');

	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.clear();
		navigate('/login');
	};

	const handleSearch = () => {};

	const onClearSearch = () => {
		setSearchQuery();
	};

	return (
		<div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow '>
			<h2 className='test-xl font-medium text-black py-2'>NoteSurf</h2>

			<SearchBar
				value={searchQuery}
				onChange={({ target }) => {
					setSearchQuery;
				}}
				handleSearch={handleSearch}
				onClearSearch={onClearSearch}
			/>

			<ProfileInfo userInfo={userInfo} onLogout={onLogout} />
		</div>
	);
};

export default Navbar;
