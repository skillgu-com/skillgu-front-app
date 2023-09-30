// Libraries
import React from 'react';

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
							{dataRow.map(({id, value, type, link}) => (
								<td key={id}>
									{type === 'download' ? (
										<a href={link} download data-type={type}>
											{value}
										</a>
									) : (
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
