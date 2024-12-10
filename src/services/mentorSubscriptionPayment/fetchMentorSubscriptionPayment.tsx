import axios from "axios";
import {
    FetchPaymentReportsServiceInput,
    FetchPaymentSubscriptionServiceOutput,
} from "@customTypes/paymentReports";
import {SubscriptionMentorReport} from "@customTypes/subscriptionMentorReport";

export const fetchMentorSubscriptionPayment = async ({
                                                         take = 5,
                                                         skip = 0,
                                                         sortBy,
                                                         sortMethod,
                                                     }: FetchPaymentReportsServiceInput): Promise<FetchPaymentSubscriptionServiceOutput> => {
    try {
        const response = await axios.get("/api/stripe/invoices/mentor-subscription", {
            params: {
                take, skip, sortBy, sortMethod,
            },
        });

        const data: SubscriptionMentorReport[] = response.data.data.subscriptions.map((report: any) => ({
            id: report?.id ?? 0,
            invoiceNo: report?.invoiceNo ?? "#0001",
            startDate: report?.startDate ? new Date(report.startDate) : new Date(),
            endDate: report?.endDate ? new Date(report.endDate) : new Date(),
            amount: report?.amount ?? 0,
            status: report?.status ?? "default",
            planName: report?.planName ?? "Basic",
            invoiceFileUrl: report?.invoiceFileUrl ?? "",
        }));

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
        const paginatedReports = data.slice(start, end);

        return {
            success: true,
            reports: paginatedReports,
            total: data.length,
        };
    } catch (error) {
        console.error("Error fetching mentor subscription payments:", error);

        return {
            success: false,
            errorMessage: "Failed to fetch mentor subscription reports.",
            reports: [],
            total: 0,
        };
    }
};
