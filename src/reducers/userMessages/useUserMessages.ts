import {Dispatch} from "redux";
import {useDispatch, useSelector} from "react-redux";
import {UserMessagesState, UserMessagesAction} from "./userMessagesReducer.types";
import userMessagesReducerInitialState from "./userMessagesReducer.initial";

export const useUserMessages = () : [UserMessagesState, Dispatch<UserMessagesAction>] => {
    const userMessagesState : UserMessagesState = useSelector((state) => {
        if(state && typeof state === 'object' && 'userMessages' in state){
            return state?.userMessages as UserMessagesState
        }
        return userMessagesReducerInitialState;
    });
    const dispatch = useDispatch();

    return [userMessagesState, dispatch]
}