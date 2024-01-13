import React from 'react';

interface MentorCardDescriptionProps {
	fullName: string;
	position: string;
	contactOptions: string[];
	descritpion: string;
	skills: string[];
}

const MentorCardDescription = (props: MentorCardDescriptionProps) => {
	const {fullName, position, contactOptions, descritpion, skills} = props;

	return (
		<div>
			<div>
				{fullName}
				{position}
			</div>
			<div>{contactOptions}</div>
			<div>{descritpion}</div>
			<div>{skills}</div>
		</div>
	);
};

export default MentorCardDescription;
