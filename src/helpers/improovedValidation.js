const phoneNumberRegex =
	/^[+]?\d{1,4}[-. ]?[(]?\d{1,4}[)]?[-. ]?\d{1,9}[-. ]?\d{1,9}$/;
const emailRegex =
	/^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

const validation = (inputTouched, inputValue, inputName, required) => {
	if ((!required && !!!inputValue) || !inputTouched) return '';

	if (typeof inputValue === 'string') {
		switch (inputName) {
			case 'name':
			case 'firtsName':
			case 'LastName':
			case 'company':
				return inputValue.trim().length < 2 ? 'Pole musi przekraczać 2 znaki.' : '';
			case 'message':
				return inputValue.trim().length < 30
					? 'Wiadomość musi przekraczać 30 znaków.'
					: '';
			case 'email':
				if (!emailRegex.test(inputValue))
					return 'Podany e-mail jest nieprawidłowy.';
				return '';
			case 'phone':
				if (!phoneNumberRegex.test(inputValue))
					return 'Numer jest za nieprawidłowy.';
				return '';
			//TODO wrocic do return 'Wartość jest niepoprawna.';
			default:
				return '';
		}
	}

	if (typeof inputValue === 'boolean' && required)
		return inputValue === true ? '' : 'Pole jest wymagane.';
};

export default validation;
