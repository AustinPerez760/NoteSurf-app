import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
	return (
		<div>
			<div className='flex items-center gap-2 mt-3'>
				<input
					type='text'
					className='text-sm bg-transparent border px-3 py-2 rounded outline-none text-slate-500'
					placeholder='Add Tags'
				/>

				<button className='w-8 h-8 flex items-center justify-center rounded border border-slate-500 hover:bg-blue-300'>
					<MdAdd className='text-2xl text-slate-500 hover:text-white' />
				</button>
			</div>
		</div>
	);
};

export default TagInput;
