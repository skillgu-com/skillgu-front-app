import {Terms} from "@customTypes/terms";

export type ActionType = "UPDATE_TERMS";

export type TermsState = Terms

export type TermsAction = {
  type: ActionType;
  payload: Terms;
};
