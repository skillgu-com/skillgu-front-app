// Libraries
import React from 'react';

const Table = (props) => {
	const {headers, data} = props;

	return (
		<table>
			<thead>
				<tr>
          <th>check</th>
					{headers?.map(({id, value}) => (
            <th key={id}>{value}</th>
            ))}
				</tr>
			</thead>
			<tbody>
				{data?.map(({id, dataRow}) => (
          <tr key={id}>
            <td>check</td>
						{dataRow.map(({id, value, type}) => (
							<td key={id} data-type={type}>
								{value}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
