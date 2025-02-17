import TagInput from '../../compnents/Inputs/TagInput';

const AddEditNotes = () => {
	return (
		<div>
			<div className='flex flex-col gap-2'>
				<label className='input-label'>TITLE</label>
				<input
					type='text'
					className='text-2xl text-slate-500 outline-none'
					placeholder='Go to Gym Class at 6PM'
				/>
			</div>

			<div className='flex flex-col gap-2 mt-4'>
				<label className='input-label'>CONTENT</label>
				<textarea
					type='text'
					className='text-sm text-slate-500 outline-none bg-teal-100 p-2 rounded'
					placeholder='Content'
					rows={10}
				/>
			</div>

			<div className='mt-3 text-slate-500'>
				<label className='inoput-label'>TAGS</label>
				<TagInput />
			</div>

			<button className='btn-primary font-medium mt-5 p-3' onClick={() => {}}>
				ADD
			</button>
		</div>
	);
};

export default AddEditNotes;
