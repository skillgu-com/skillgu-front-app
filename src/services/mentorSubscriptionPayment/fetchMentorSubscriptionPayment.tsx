import axios from "axios";

import {
  FetchPaymentReportsServiceInput,
  FetchPaymentSubscriptionServiceOutput,
} from "@customTypes/paymentReports";
import { SubscriptionMentorReport } from "@customTypes/subscriptionMentorReport";

export const fetchMentorSubscriptionPayment = async ({
                                                       take = 10,
                                                       skip = 0,
                                                       sortBy,
                                                       sortMethod,
                                                     }: FetchPaymentReportsServiceInput): Promise<FetchPaymentSubscriptionServiceOutput> => {
  try {
    // const res = await axios.get("/api/payment/mentor-subscription");

    const data: SubscriptionMentorReport[] = [
      {
        id: 1,
        invoiceNo: "#001",
        startDate: new Date(),
        endDate: new Date(),
        amount: 25000,
        status: "processing",
        planName: "Basic",
        invoiceFileUrl: "string",
      },
      {
        id: 2,
        invoiceNo: "#002",
        startDate: new Date(),
        endDate: new Date(),
        amount: 80000,
        status: "complete",
        planName: "Pro",
        invoiceFileUrl: "string",
      },
      {
        id: 3,
        invoiceNo: "#003",
        startDate: new Date(),
        endDate: new Date(),
        amount: 80000,
        status: "card_error",
        planName: "Pro",
        invoiceFileUrl: "string",
      },
    ];

    if (sortBy && sortMethod) {
      data.sort((a: SubscriptionMentorReport, b: SubscriptionMentorReport) => {
        const aValue = a[sortBy as keyof SubscriptionMentorReport];
        const bValue = b[sortBy as keyof SubscriptionMentorReport];

        if (sortMethod === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }

    const start = skip;
    const end = start + take;
    const reports = data.slice(start, end);

    return {
      success: true,
      reports,
      total: data.length, // Całkowita liczba raportów przed paginacją
    };
  } catch (error) {
    console.error("Error fetching mentor subscription payments:", error);

    return {
      success: false,
      errorMessage: "Nie udało się pobrać raportów subskrypcji mentora.",
      reports: [],
      total: 0, // Ustaw total na 0 w przypadku błędu
    };
  }
};
