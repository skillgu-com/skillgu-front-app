import userMessagesReducerInitialState from "./userMessagesReducer.initial";
import {UserMessagesAction, UserMessagesState} from "./userMessagesReducer.types";

export const userMessagesReducer = (
  state = userMessagesReducerInitialState,
  action: UserMessagesAction
): UserMessagesState => {
  switch (action.type) {
    case "CLEAR_MESSAGE": {
      if(action.payload.messageKey === state.currentMessage?.messageKey) {
        return {
          currentMessage: null,
        };
      }
      return state;
    }
    case "SET_MESSAGE": {
      return {
        ...state,
        currentMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
