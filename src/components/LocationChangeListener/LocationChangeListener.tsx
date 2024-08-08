import {useBookingReducer} from "../../reducers/booking";
import {matchPath, useLocation} from "react-router-dom";
import useDidUpdateEffect from "../../hooks/useDidUpdateEffect";
import paths from "../../paths";

const locationsToClearBookingState = [
    paths.studentSubscriptionDetail,
    paths.sessionBook,
]

const LocationChangeListener = () => {
    const location = useLocation();

    const [ _, dispatchBookingAction] = useBookingReducer();

    const clearBookingState = () => {
        dispatchBookingAction({ type: 'RESET_STATE'})
    }

    useDidUpdateEffect(() => {
        if(locationsToClearBookingState.some((path) => matchPath({path}, location.pathname))) {
            clearBookingState();
        }
    }, [location]);

    return null;
}

export default LocationChangeListener;