export const generateTitle = (rate: number) => {
  switch (rate) {
    case 1:
      return "Zdecydowanie nie polecam";
    case 2:
      return "Nie spełniło moich oczekiwań";
    case 3:
      return "Zadowalająca praca, ale nic szczególnego";
    case 4:
      return "Dobre doświadczenie, polecam";
    case 5:
      return "Świetna praca, pełna satysfakcja";
    default:
      return "Świetna praca, pełna satysfakcja";
  }
};
