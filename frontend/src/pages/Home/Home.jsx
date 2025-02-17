import { useState } from 'react';
import Navbar from '../../compnents/Navbar';
import NoteCard from '../../compnents/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import Modal from 'react-modal';

const Home = () => {
	const [openAddEditModal, setOpenAddEditModal] = useState({
		isShown: false,
		type: 'add',
		data: null,
	});

	return (
		<>
			<Navbar />

			<div className='container mx-auto'>
				<div className='grid grid-cols-3 gap-4 mt-8'>
					<NoteCard
						title='Meeting next wednesday the 20th'
						date='20th of Feburary'
						content='Meeting for one hour'
						tags='#Meeting'
						isPinned={true}
						onEdit={() => {}}
						onDelete={() => {}}
						onPinNote={() => {}}
					/>
				</div>
			</div>
			<button
				className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-400 hover:bg-blue-500 absolute right-10 bottom-10'
				onClick={() => {
					setOpenAddEditModal({
						...openAddEditModal,
						isShown: true,
					});
				}}>
				<MdAdd className='text-[32px] text-white' />
			</button>

			<Modal
				isOpen={openAddEditModal.isShown}
				onRequestClose={() => {}}
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
				}}
				contentLabel=''
				className=''>
				<AddEditNotes />
			</Modal>
		</>
	);
};
export default Home;
