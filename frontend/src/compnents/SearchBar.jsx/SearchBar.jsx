import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
	return (
		<div className='w-80 flex items-center px-4 bg-teal-100 rounded-md'>
			<input
				type='text'
				placeholder='Search Notes'
				className='w-full text-xs bg-transparent py-[11px] outline-none'
				value={value}
				onChange={onChange}
			/>

			<IoMdClose
				className='text-xl text-blue-400 cursor-pointer hover:text-blue-700 mr-3'
				onClick={onClearSearch}
			/>

			<FaMagnifyingGlass
				className='text-blue-400 cursor-pointer hover:text-blue-700'
				onClick={handleSearch}
			/>
		</div>
	);
};

export default SearchBar;
