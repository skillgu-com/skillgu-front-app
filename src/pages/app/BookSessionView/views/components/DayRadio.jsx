import React, {useMemo} from 'react';

const DayRadio = (props) => {
	const {date, id, name, toTime, fromTime,selectedId, onChangeHandler} = props;

	const currentDate = new Date(date);

	const isSelected = useMemo(() => selectedId === id, [selectedId, id]);
	// console.log(props)

	return (
		<label className='day-radio' data-selected={isSelected}>
			{date && (
				<>
					<span className='day-radio__weekday'>
						{currentDate.toLocaleString('default', {weekday: 'short'})}
					</span>
					<span className='day-radio__date'>
						{currentDate.getDate()}{' '}
						{currentDate.toLocaleString('default', {month: 'long'})}
					</span>
				</>
			)}
			{props.weekDayCells
				&& <span className='day-radio__spots'>{props.weekDayCells} miejsca</span>}
			{fromTime && <span className='day-radio__time'>{toTime}</span>}
			{/*{fromTime && <span className='day-radio__time'>{fromTime}</span>}*/}
			<input
				type='radio'
				name={name}
				id={id}
				className='day-radio__input'
				onChange={() => onChangeHandler(id)}
				checked={isSelected}
			/>
			{/*<span>{props?.fromTime} - </span>*/}
			{/*<span>{props?.toTime}</span>*/}
		</label>
	);
};

export default DayRadio;
