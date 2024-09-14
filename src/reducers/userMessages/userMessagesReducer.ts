import userMessagesReducerInitialState from "./userMessagesReducer.initial";
import {UserMessagesAction, UserMessagesState} from "./userMessagesReducer.types";

export const userMessagesReducer = (
  state = userMessagesReducerInitialState,
  action: UserMessagesAction
): UserMessagesState => {
  switch (action.type) {
    case "CLEAR_MESSAGE":
      return {
        currentMessage: null,
      };
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
