import axios from "axios";
import { ContactServiceInput, ContactServiceOutput } from "./contact.types";

export const contactService = async ({
  senderEmail,
  message,
}: ContactServiceInput): Promise<ContactServiceOutput> => {
  console.log(message);
  // TODO
  const response = await axios.post("....", { senderEmail, message });

  return {
    success: true,
    successMessage:
      "Dziękujemy za wiadomość. Numer Twojego zgłoszenia to #1029", // @TODO
  };

  // return {
  //     success: false,
  //     errorMessage: 'Nie udało się wysłać wiadomości z powodu błędu serwera. Skontaktuj się z nami na email help@skillgu.com ', // @TODO
  // }
};
