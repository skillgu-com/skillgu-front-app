// Libraries
import React from 'react';
// Components
import CustomButton from '../CustomButton';

const Table = (props) => {
	const {headers, data} = props;

	return (
		<div className='styled-table'>
			<table>
				<thead className='styled-table__head'>
					<tr>
						{headers?.map(({id, value}) => (
							<th key={id}>{value}</th>
						))}
					</tr>
				</thead>
				<tbody className='styled-table__body'>
					{data?.map(({id, dataRow}) => (
						<tr key={id}>
							{dataRow.map(({id, value, type, link, buttonProps}) => (
								<td key={id}>
									{type === 'download' ? (
										<a href={link} download data-type={type}>
											{value}
										</a>
									) : type === 'button'? <CustomButton {...buttonProps}>{value}</CustomButton>: (
										<span data-type={type}>{value}</span>
									)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
