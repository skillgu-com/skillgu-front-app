import { UPDATE_TERMS } from "./constants";
import {Terms} from "@customTypes/terms";

export const updateTerms = (terms: Terms) => ({
  type: UPDATE_TERMS,
  payload: terms,
});
