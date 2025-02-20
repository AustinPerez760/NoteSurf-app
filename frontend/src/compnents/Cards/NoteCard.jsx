/* eslint-disable react/prop-types */
import moment from 'moment';
import { MdOutlinePushPin } from 'react-icons/md';
import { MdCreate, MdDelete } from 'react-icons/md';

const NoteCard = ({
	title,
	date,
	content,
	tags,
	isPinned,
	onEdit,
	onDelete,
	onPinNote,
}) => {
	return (
		<div className='border rounded p-4 bg-teal-100 hover:shadow-xl transition-all ease-in-out'>
			<div className='flex items-center justify-between'>
				<div>
					<h6 className='text-sm font-medium'>{title}</h6>
					<span className='text-xs text-slate-500'>
						{moment(date).format('Do MMM YYYY')}
					</span>
				</div>

				<MdOutlinePushPin
					className={`icon-btn ${
						isPinned ? 'text-blue-400' : 'text-slate-400'
					}`}
					onClick={onPinNote}
				/>
			</div>

			<p className='text-xs text-slate-600 mt-2'>{content?.slice(0, 60)}</p>

			<div className='flex items-center justify-bewteen mt-2'>
				<div className='text-xs text-slate-500'>
					{tags.map((item) => `#${item}`)}
				</div>

				<div className='flex items-center gap-2'>
					<MdCreate className='icon-btn hover:text-blue-400' onClick={onEdit} />
					<MdDelete
						className='icon-btn hover:text-blue-400'
						onClick={onDelete}
					/>
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
