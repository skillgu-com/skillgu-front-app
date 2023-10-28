import React, {useEffect, useState, useRef} from 'react';
import classNames from 'classnames';

const Modal = (props) => {
	const {trigger, children, close, setClose, buttonClasses} = props;
	const [visibility, setVisibility] = useState(false);

	const modalContainer = useRef(null);

	const triggerModalHandler = (value) =>
		value ? setVisibility(value) : setVisibility(!visibility);

	useEffect(() => {
		if (!close) return;
		setVisibility(false);
		setClose(false);
	}, [close, setClose]);

	useEffect(() => {
		const hideModal = (e) => {
			(!modalContainer.current || !modalContainer.current.contains(e.target)) &&
				setVisibility(false);
		};

		setTimeout(
			() => visibility && window.addEventListener('click', hideModal),
			100
		);

		return () => window.removeEventListener('click', hideModal);
	}, [visibility]);

	return (
		<>
			<button className={classNames('modal__button', buttonClasses)} onClick={() => triggerModalHandler(true)}>
				{trigger}
			</button>
			<div className={`modal${visibility ? ' modal--visible' : ''}`}>
				<div ref={modalContainer} className='modal__container'>
					<button
						className='modal__close'
						onClick={() => triggerModalHandler(false)}>
						x
					</button>
					{children}
				</div>
			</div>
		</>
	);
};

export default Modal;
