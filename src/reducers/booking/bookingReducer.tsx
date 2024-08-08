import { bookingInitialState } from "./constants";
import { type BookingAction, type BookingState } from "./types";
import {get} from "react-hook-form";

export const bookingReducer = (
  state = bookingInitialState,
  action: BookingAction
): BookingState => {
  switch (action.type) {
    case "SET_MENTOR":
      return {
        ...state,
        mentor: action.payload.mentor || null,
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload.service || null,
      };
    case "SET_CALENDAR_WEEK_PREV":
      return {
        ...state,
        calendarFirstDay:
          action.payload.calendarFirstDay || state.calendarFirstDay || "",
      };
    case "SLOTS_SELECT":
      return {
        ...state,
        slots: action.payload.slots,
        slotsError: "",
      };
    case "SLOTS_ERROR":
      return {
        ...state,
        slotsError: action.payload.slotsError,
      };
    case "SET_EMAIL": {
      const customerEmail = get(action.payload, "customerEmail", null);
      if(customerEmail) {
        return {
          ...state,
          customerEmail,
          customerEmailError: "",
        };
      }
      const customerEmailError = get(action.payload, "customerEmailError", null);
      if(customerEmailError) {
        return {
          ...state,
          customerEmailError,
        };
      }
      return state;
    }
    case "SET_PHONE": {
      const customerPhone = get(action.payload, "customerPhone", null);
      if(customerPhone) {
        return {
          ...state,
          customerPhone,
          customerPhoneError: "",
        };
      }
      const customerPhoneError = get(action.payload, "customerPhoneError", null);
      if(customerPhoneError) {
        return {
          ...state,
          customerPhoneError,
        };
      }
      return state;
    }
    case "SET_MESSAGE": {
      const customerMessage = get(action.payload, "customerMessage", null);
      if(customerMessage) {
        return {
          ...state,
          customerMessage,
          customerMessageError: "",
        };
      }
      const customerMessageError = get(action.payload, "customerMessageError", null);
      if(customerMessageError) {
        return {
          ...state,
          customerMessageError,
        };
      }
      return state;
    }
    case "SWITCH_CONSENTS":
      return {
        ...state,
        consents: action.payload ? action.payload.consents : !state.consents,
      };
    case "SWITCH_INVITE_TEAM":
      return {
        ...state,
        inviteTeam: action.payload ? action.payload.inviteTeam : !state.inviteTeam,
      };
    case "UPDATE_TEAM_MEMBERS":
      return {
        ...state,
        teamMembers: action.payload.teamMembers,
      };
    case "RESET_STATE":
      return bookingInitialState;
    default:
      return state;
  }
};
