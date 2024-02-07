// Libraries
import React, {useMemo} from 'react';
// Icons
import LinkedIn from 'src/assets/icons/social-media/LinkedIn';
import Instagram from 'src/assets/icons/social-media/Instagram';
import Website from 'src/assets/icons/social-media/Website';
import YouTube from 'src/assets/icons/social-media/YouTube';
import Source from 'src/assets/icons/Source';
// Styles
import styles from './SocialLink.module.scss';
import {Link} from 'react-router-dom';

interface SocialLinkProps {
	link: string;
	type:
		| 'linkedInURL'
		| 'youtubeURL'
		| 'instagramURL'
		| 'facebookURL'
		| 'websiteURL'
		| 'youtube';
}

const SocialLink = (props: SocialLinkProps) => {
	const {link, type} = props;

	const icon = useMemo(() => {
		switch (type) {
			case 'linkedInURL':
				return <LinkedIn />;
			case 'instagramURL':
				return <Instagram />;
			case 'youtubeURL':
			case 'youtube':
				return <YouTube />;
			default:
				return <Website />;
		}
	}, [type]);

	const text = useMemo(() => {
		switch (type) {
			case 'linkedInURL':
				return 'Linkedin';
			case 'instagramURL':
				return 'Youtube';
			case 'youtubeURL':
			case 'youtube':
				return 'Instagram';
			default:
				return 'Strona www';
		}
	}, [type]);

	return (
		<a href={link} target='_blank' rel='noreferrer' className={styles.link}>
			<span className={styles.title}>
				{icon} {text}
			</span>
			<span className={styles.source}>
				{link.slice(0, 19)}
				{link.length > 19 && '...'} <Source />
			</span>
		</a>
	);
};

export default SocialLink;
