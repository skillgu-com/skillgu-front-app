import { Resolver } from "react-hook-form";
import { AddReviewFormTypes } from "./AddReviewPopup";

export const resolver: Resolver<AddReviewFormTypes> = async (values) => {
  type ErrorTypes = { [key: string]: { type: string; message: string } };
  const errors: ErrorTypes = {};

  if (values.message.length < 20)
    errors.message = {
      type: "required length",
      message: "Treść wiadomości jest za krótka",
    };
  if (!values.message)
    errors.message = {
      type: "required",
      message: "Treść wiadomości jest wymagana",
    };
  if (!values.authorName)
    errors.authorName = {
      type: "required",
      message: "Podpis jest wymagany",
    };

  return {
    values: values.message ? values : {},
    errors: errors.message ? errors : {},
  };
};
