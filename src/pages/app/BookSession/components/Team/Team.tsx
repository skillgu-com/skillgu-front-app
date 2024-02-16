import React from 'react';

interface TeamProps{
  limit: number
}

const Team = (props: TeamProps) => {
	return (
		<div>
			<button>+Dodaj kolejną osobę</button>
		</div>
	);
};

export default Team;
