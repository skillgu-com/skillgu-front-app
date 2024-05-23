import { useReducer } from "react";
import { bookingReducer } from "./bookingReducer";
import { bookingInitialState } from "./constants";
import { useSelector, useDispatch } from 'react-redux';
import { BookingAction, BookingState } from "./types";
import { AnyAction, Dispatch } from "redux";

export const useBookingReducer = () : [BookingState, Dispatch<BookingAction>] => {
    const bookingState : BookingState = useSelector((state) => {
        if(state && typeof state === 'object' && 'booking' in state){
            return state?.booking as BookingState
        }
        return bookingInitialState
    });
    const dispatch = useDispatch();

    return [bookingState, dispatch]
    // return useReducer(
    //     bookingReducer,
    //     bookingInitialState,
    // );
}
