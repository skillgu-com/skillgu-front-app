import React from 'react';
import {Link} from 'react-router-dom';

export const buttonTypes = {
	button: 'button',
	submit: 'submit',
	externalLink: 'external-link',
	internalLink: 'internal-link',
	span: 'span',
};

export const buttonColors = {
	primary: 'primary',
	secondary: 'secondary',
	light: 'light',
	dark: 'dark',
	transparent: 'transparent',
};

const CustomButton = ({
	as = buttonTypes.button,
	color = buttonColors.primary,
	children,
	classes,
	link,
	_onClick,
	disabled,
}) => {
	const config = `custom-btn custom-btn--${color}${
		classes ? ' ' + classes : ''
	}`;
	
	switch (as) {
		case buttonTypes.externalLink:
			if (!link) throw new Error('Link type should has link attribute.');
			return (
				<a className={config} href={link} onClick={_onClick && _onClick}>
					{children}
				</a>
			);
		case buttonTypes.internalLink:
			if (!link) throw new Error('Link type should has link attribute.');
			return (
				<Link className={config} to={link} onClick={_onClick && _onClick}>
					{children}
				</Link>
			);
		case buttonTypes.submit:
			if (link)
				throw new Error(
					'Button can not have link attribute. Use internal or external link type.'
				);
			return (
				<button
					type='submit'
					className={config}
					onClick={_onClick && _onClick}
					disabled={disabled}>
					{children}
				</button>
			);
		case buttonTypes.span:
			return <span className={config}>{children}</span>;
		default:
			if (link)
				throw new Error(
					'Button can not have link attribute. Use internal or external link type.'
				);
			return (
				<button
					type='button'
					className={config}
					onClick={_onClick && _onClick}
					disabled={disabled}>
					{children}
				</button>
			);
	}
};

export default CustomButton;
