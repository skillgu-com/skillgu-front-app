export type ReportStatus = "error" | "in-progress" | "paid";

export type Report = {
  id: number;
  invoiceNo: string;
  date: string;
  amount: number;
  status: ReportStatus;
  sessionTitle: string;
  invoiceFileUrl: string;
};
