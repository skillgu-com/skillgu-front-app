// Libraries
import {useSelector} from 'react-redux';
// Selectors
import {getUser} from 'src/redux/selectors/authSelectors';

export const useCurrentUser = () => {
	const user = useSelector(getUser);
	return user?.id ? user : null;
};
