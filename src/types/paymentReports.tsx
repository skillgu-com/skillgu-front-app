import { Report } from "@customTypes/reports";
import { SubscriptionMentorReport } from "./subscriptionMentorReport";

export type FetchPaymentReportsServiceInput = {
  page?: number;
  take?: number;
  skip?: number;
  sortBy?: string;
  sortMethod?: string;
};

export type FetchPaymentReportsServiceOutput =
  | {
      success: false;
      errorMessage: string;
    }
  | {
      reports: Report[];
      total: number;
      success: true;
    };

export type FetchPaymentSubscriptionServiceOutput =
  | {
      success: false;
      errorMessage: string;
    }
  | {
      reports: SubscriptionMentorReport[];
      total: number;
      success: true;
    };
