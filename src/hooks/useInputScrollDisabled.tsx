import { useEffect } from "react";

export const useInputScrollDisabled = () => {
  useEffect(() => {
    const handleWheel = (e: Event) => {
      e.preventDefault();
    };

    const numberInputs = document.querySelectorAll('input[type="number"]');

    numberInputs.forEach((input) => {
      input.addEventListener("wheel", handleWheel, { passive: false });
    });

    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener("wheel", handleWheel);
      });
    };
  }, []);
};
