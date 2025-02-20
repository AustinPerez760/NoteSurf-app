/* eslint-disable react/prop-types */
import TagInput from '../../compnents/Inputs/TagInput';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import axiosInstance from '../../utils/axiosinstance';

const AddEditNotes = ({
	noteData,
	type,
	getAllNotes,
	onClose,
	showToastMessage,
}) => {
	const [title, setTitle] = useState(noteData?.title || '');
	const [content, setContent] = useState(noteData?.content || '');
	const [tags, setTags] = useState(noteData?.tag || []);

	const [error, setError] = useState(null);

	// Add Note
	const addNewNote = async () => {
		try {
			const response = await axiosInstance.post('/add-note', {
				title,
				content,
				tags,
			});

			if (response.data && response.data.note) {
				showToastMessage('Note Added Successfully');
				getAllNotes();
				onClose();
			}
		} catch (error) {
			if (error.reponse && error.response.data && error.response.data.error) {
				setError(error.response.data.message);
			}
		}
	};
	// Edit Note
	const editNote = async () => {
		const noteId = noteData._id;
		try {
			const response = await axiosInstance.put('/edit-note/' + noteId, {
				title,
				content,
				tags,
			});

			if (response.data && response.data.note) {
				showToastMessage('Note Updated Successfully');
				getAllNotes();
				onClose();
			}
		} catch (error) {
			if (error.reponse && error.response.data && error.response.data.error) {
				setError(error.response.data.message);
			}
		}
	};

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
			addNewNote();
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
					placeholder='Go on type away!'
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
				className='btn-primary bg-teal-100 font-medium mt-5 p-3 cursor-pointer'
				onClick={handleAddNote}>
				{type === 'edit' ? 'UPDATE' : 'ADD'}
			</button>
		</div>
	);
};

export default AddEditNotes;
