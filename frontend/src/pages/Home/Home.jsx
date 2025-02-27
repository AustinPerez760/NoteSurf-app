import { useEffect, useState } from 'react';
import Navbar from '../../compnents/Navbar';
import NoteCard from '../../compnents/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosinstance';
import Modal from 'react-modal';
import Toast from '../../compnents/ToastMessage/Toast';
import EmptyCard from '../../compnents/EmptyCard/EmptyCard';
import AddNotesImage from '../../assets/images/add-notes.svg';
import NoDataImg from '../../assets/images/no-data.svg';

const Home = () => {
	const [openAddEditModal, setOpenAddEditModal] = useState({
		isShown: false,
		type: 'add',
		data: null,
	});

	const [showToastMsg, setShowToastMsg] = useState({
		isShown: false,
		type: 'add',
		message: '',
	});

	const [allNotes, setAllNotes] = useState([]);
	const [userInfo, setUserInfo] = useState(null);

	const [isSearch, setIsSearch] = useState(false);

	const navigate = useNavigate();

	const handleEdit = (noteDetails) => {
		setOpenAddEditModal({
			isShown: true,
			type: 'edit',
			data: noteDetails,
		});
	};

	const showToastMessage = (message, type) => {
		setShowToastMsg({ isShown: true, message: message, type: type });
	};

	const handleCloseToast = () => {
		setShowToastMsg({ isShown: false, message: '' });
	};

	// get user info
	const getUserInfo = async () => {
		try {
			const response = await axiosInstance.get('/get-user');
			if (response.data && response.data.user) {
				setUserInfo(response.data.user);
			}
		} catch (error) {
			if (error.response.status === 401) {
				localStorage.clear();
				navigate('/login');
			} else {
				console.error('Error fetching user info:', error);
			}
		}
	};

	// Get all notes
	const getAllNotes = async () => {
		try {
			const response = await axiosInstance.get('/get-all-notes');

			if (response.data && response.data.notes) {
				setAllNotes(response.data.notes);
			}
		} catch (error) {
			console.log('Error fetching notes:', error);
		}
	};

	// Delete note
	const deleteNote = async (data) => {
		const noteId = data._id;
		try {
			const response = await axiosInstance.delete('/delete-note/' + noteId);

			if (response.data && !response.data.error) {
				showToastMessage('Note Deleted Successfully', 'delete');
				getAllNotes();
			}
		} catch (error) {
			if (error.reponse && error.response.data && error.response.data.error) {
				console.log('An unexpected error occurred. Please try again');
			}
		}
	};

	// Search for note
	const onSearchNote = async (query) => {
		try {
			const response = await axiosInstance.get('/search-notes', {
				params: { query },
			});

			if (response.data && response.data.notes) {
				setIsSearch(true);
				setAllNotes(response.data.notes);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateIsPinned = async (noteData) => {
		const noteId = noteData._id;
		try {
			const response = await axiosInstance.put(
				'/update-note-pinned/' + noteId,
				{
					isPinned: !noteData.isPinned,
				}
			);

			if (response.data && response.data.note) {
				showToastMessage('Note Updated Successfully');
				getAllNotes();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleClearSearch = () => {
		setIsSearch(false);
		getAllNotes();
	};

	useEffect(() => {
		getAllNotes();
		getUserInfo();
		return () => {};
	}, []);

	return (
		<>
			<Navbar
				userInfo={userInfo}
				onSearchNote={onSearchNote}
				handleClearSearch={handleClearSearch}
			/>

			<div className='container mx-auto'>
				{allNotes.length > 0 ? (
					<div className='grid grid-cols-3 gap-4 mt-8'>
						{allNotes.map((item) => (
							<NoteCard
								key={item._id}
								title={item.title}
								date={item.createdOn}
								content={item.content}
								tags={item.tags}
								isPinned={item.isPinned}
								onEdit={() => handleEdit(item)}
								onDelete={() => deleteNote(item)}
								onPinNote={() => updateIsPinned(item)}
							/>
						))}
					</div>
				) : (
					<EmptyCard
						imgSrc={isSearch ? NoDataImg : AddNotesImage}
						message={
							isSearch
								? `Whoops! No Notes Found`
								: `To stop letting your thoughts, ideas, and reminders surf away click the 'Add' button 🏄‍♂️ '`
						}
					/>
				)}
			</div>
			<button
				className='w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-400 hover:bg-blue-500 absolute right-10 bottom-10'
				onClick={() => {
					setOpenAddEditModal({
						...openAddEditModal,
						isShown: true,
						type: 'add',
						data: null,
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
				className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'>
				<AddEditNotes
					type={openAddEditModal.type}
					noteData={openAddEditModal.data}
					onClose={() => {
						setOpenAddEditModal({ isShown: false, type: 'add', data: null });
					}}
					getAllNotes={getAllNotes}
					showToastMessage={showToastMessage}
				/>
			</Modal>

			<Toast
				isShown={showToastMsg.isShown}
				type={showToastMsg.type}
				message={showToastMsg.message}
				onClose={handleCloseToast}
			/>
		</>
	);
};
export default Home;
