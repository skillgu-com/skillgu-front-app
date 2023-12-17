// Libraries
import React, {useMemo} from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import {ButtonHTMLAttributes, AnchorHTMLAttributes} from 'react';
// Types
import {Common} from '../../types/main';
// styles
import styles from './Button.module.scss';

export enum ButtonTag {
	InternalLink = 'Link',
	ExternalLink = 'a',
	Button = 'button',
}

export enum ButtonVariant {
	Primary = 'primary',
	Light = 'light',
	Dark = 'dark',
	Outline = 'outline',
}

interface CommonProps extends Common {
	as?: ButtonTag;
	fullWidth?: boolean;
	href?: string;
	variant?: ButtonVariant;
}
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const Button: React.FC<
	(CommonProps & ButtonProps) | (CommonProps & AnchorProps)
> = (props) => {
	const {
		fullWidth,
		classes,
		children,
		id,
		href,
		as = ButtonTag.Button,
		variant = ButtonVariant.Primary,
	} = props;

	const config = useMemo(() => {
		const omitedProps = Object.fromEntries(
			Object.entries(props).filter(
				(e) =>
					e[0] !== 'fullWidth' &&
					e[0] !== 'classes' &&
					e[0] !== 'href' &&
					e[0] !== 'children' &&
					e[0] !== 'as'
			)
		);
		return {
			...omitedProps,
			className: classNames(
				styles.button,
				{[styles.buttonFullWidth]: fullWidth},
				classes
			),
			'data-variant': variant,
		};
	}, [classes, id]);

	// Returned JSX
	switch (as) {
		case ButtonTag.InternalLink:
			const linkConfig = config as any;
			return (
				<Link {...linkConfig} to={href ?? '/'}>
					{children}
				</Link>
			);
		case ButtonTag.ExternalLink:
			const anchorConfig = config as AnchorProps;
			return (
				<a {...anchorConfig} href={href ?? '/'}>
					{children}
				</a>
			);
		default:
			const buttonConfig = config as ButtonProps;
			return <button {...buttonConfig}>{children}</button>;
	}
};

export default Button;
