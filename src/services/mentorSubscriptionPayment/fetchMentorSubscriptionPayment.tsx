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
    const response = await axios.get("/api/payment/mentor-subscription", {
      params: {
        take,
        skip,
        sortBy,
        sortMethod,
      },
    });

    // const reports = response.data;
    const reports = { data: { reports: [{}] } }; // Mocked response with an empty object

    const data: SubscriptionMentorReport[] = reports.data.reports.map((report: any) => ({
      id: report?.id || 1,
      invoiceNo: report?.invoiceNo || "#0001",
      startDate: report?.startDate ? new Date(report.startDate) : new Date(),
      endDate: report?.endDate ? new Date(report.endDate) : new Date(),
      amount: report?.amount || 8900,
      status: report?.status || "complete",
      planName: report?.planName || "MID",
      invoiceFileUrl: report?.invoiceFileUrl || "",
    }));

    // const data: SubscriptionMentorReport[] = [
    //   {
    //     id: 1,
    //     invoiceNo: "#00232321",
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     amount: 25000,
    //     status: "processing",
    //     planName: "Basic",
    //     invoiceFileUrl: "string",
    //   },
    //   {
    //     id: 2,
    //     invoiceNo: "#002",
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     amount: 80000,
    //     status: "completetest",
    //     planName: "Pro",
    //     invoiceFileUrl: "string",
    //   },
    //   {
    //     id: 3,
    //     invoiceNo: "#002",
    //     startDate: new Date(),
    //     endDate: new Date(),
    //     amount: 80000,
    //     status: "card_errortest",
    //     planName: "Pro",
    //     invoiceFileUrl: "string",
    //   },
    // ];

    // Sort the data if sortBy and sortMethod are provided
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

    // Handle pagination
    const start = skip;
    const end = start + take;
    const paginatedReports = data.slice(start, end);

    // Return the response object
    return {
      success: true,
      reports: paginatedReports,
      total: data.length, // Total number of reports before pagination
    };
  } catch (error) {
    console.error("Error fetching mentor subscription payments:", error);

    // Return an error response
    return {
      success: false,
      errorMessage: "Failed to fetch mentor subscription reports.",
      reports: [],
      total: 0, // Set total to 0 in case of an error
    };
  }
};
