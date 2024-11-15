type SubscriptionMentorReportStatus =
    | "requires_payment_method"
    | "requires_confirmation"
    | "requires_action"
    | "processing"
    | "requires_capture"
    | "canceled"
    | "succeeded"
    | "complete";

export type SubscriptionMentorReport = {
  id: number;
  invoiceNo: string;
  date: string;
  amount: number;
  status: SubscriptionMentorReportStatus;
  sessionTitle: string;
  invoiceFileUrl: string;
};
