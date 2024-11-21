export type SubscriptionMentorReportStatus =
  | "requires_payment_method"
  | "requires_confirmation"
  | "requires_action"
  | "processing"
  | "requires_capture"
  | "canceled"
  | "succeeded"
  | "complete"
  | "card_error";

export type SubscriptionMentorReport = {
  id: number;
  invoiceNo: string;
  startDate: string | Date;
  endDate: string | Date;
  amount: number;
  status: SubscriptionMentorReportStatus;
  planName: string;
  invoiceFileUrl: string;
};
