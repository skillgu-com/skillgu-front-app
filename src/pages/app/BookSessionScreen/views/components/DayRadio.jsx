import React, {useMemo} from 'react';

const DayRadio = (props) => {
	const {date, spots, id, name, hour, selectedId, onChangeHandler} = props;

	const currentDate = new Date(date);

	const isSelected = useMemo(() => selectedId === id, [selectedId, id]);

	return (
		<label className='day-radio' data-selected={isSelected}>
			{date && (
				<>
					<span className='day-radio__weekday'>
						{currentDate.toLocaleString('default', {weekday: 'short'})}
					</span>
					<span className='day-radio__date'>
						{currentDate.getDay()}{' '}
						{currentDate.toLocaleString('default', {month: 'long'})}
					</span>
				</>
			)}
			{spots && <span className='day-radio__spots'>{spots} miejsca</span>}
			{hour && <span className='day-radio__time'>{hour}</span>}
			<input
				type='radio'
				name={name}
				id={id}
				className='day-radio__input'
				onChange={() => onChangeHandler(id)}
				checked={isSelected}
			/>
		</label>
	);
};

export default DayRadio;
