import TagInput from '../../compnents/Inputs/TagInput';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';

const AddEditNotes = ({ noteData, type, onClose }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState([]);

	const [error, setError] = useState(null);

	// Add Note
	const addNewNote = async () => {};
	// Edit Note
	const editNote = async () => {};

	const handleAddNote = () => {
		if (!title) {
			setError('Title is required');
			return;
		}

		if (!content) {
			setError('Content is required');
			return;
		}

		setError('');

		if (type === 'edit') {
			editNote();
			// Handle edit note logic
		} else {
			addNote();
			// Handle add note logic
		}
	};

	return (
		<div className='relative'>
			<button
				className='cursor-pointer w-10 h-10 rounded-full flex items-center justify-center absolute -top-2 -right-3 hover:bg-blue-300'
				onClick={onClose}>
				<MdClose className='text-xl text-slate-400' />
			</button>

			<div className='flex flex-col gap-2'>
				<label className='input-label'>TITLE</label>
				<input
					type='text'
					className='text-2xl text-slate-500 outline-none'
					placeholder='Go to Gym Class at 6PM'
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>

			<div className='flex flex-col gap-2 mt-4'>
				<label className='input-label'>CONTENT</label>
				<textarea
					type='text'
					className='text-sm text-slate-500 outline-none bg-teal-100 p-2 rounded'
					placeholder='Content'
					rows={10}
					value={content}
					onChange={({ target }) => setContent(target.value)}
				/>
			</div>

			<div className='mt-3 text-slate-500'>
				<label className='inoput-label'>TAGS</label>
				<TagInput tags={tags} setTags={setTags} />
			</div>

			{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}

			<button
				className='btn-primary font-medium mt-5 p-3'
				onClick={handleAddNote}>
				ADD
			</button>
		</div>
	);
};

export default AddEditNotes;
