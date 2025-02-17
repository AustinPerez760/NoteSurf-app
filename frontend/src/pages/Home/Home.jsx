import Navbar from '../../compnents/Navbar';
import NoteCard from '../../compnents/Cards/NoteCard';

const Home = () => {
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
		</>
	);
};
export default Home;
