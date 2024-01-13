import React from 'react';

interface MentorCardPriceProps {
	price: number;
	logoUrl: string;
	companyName: string;
}

const MentorCardPrice = (props: MentorCardPriceProps) => {
	const {price, logoUrl, companyName} = props;

	return (
		<div>
			<div>
				<img src={logoUrl} alt={companyName} />
			</div>
			<div>
				od {price}
			</div>
		</div>
	);
};

export default MentorCardPrice;
