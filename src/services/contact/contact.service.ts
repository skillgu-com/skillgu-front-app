import axios from "axios";
import { ContactServiceInput, ContactServiceOutput } from "./contact.types";

export const contactService = async ({
  email,
  message,
}: ContactServiceInput): Promise<ContactServiceOutput> => {
  try {
    const response = await axios.post("/api/contact/app/send", {
      email,
      message,
    });

    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        successMessage: "Dziękujemy! Wiadomość została wysłana",
      };
    } else {
      return {
        success: false,
        errorMessage:
          "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
      };
    }
  } catch (error) {
    console.error("Błąd przy wysyłaniu wiadomości: ", error);
    return {
      success: false,
      errorMessage:
        "Nie udało się wysłać wiadomości z powodu błędu serwera. Skontaktuj się z nami na email help@skillgu.com",
    };
  }
};
