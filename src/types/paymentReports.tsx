import {SubscriptionMentorReport} from "@customTypes/subscriptionMentorReport";
import {Report} from "@customTypes/reports";

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
    total: number; // Dodano total do przypadku błędu
    reports: []; // Pusta tablica raportów w przypadku błędu
}
    | {
    success: true;
    reports: Report[];
    total: number;
};

export type FetchPaymentSubscriptionServiceOutput =
    | {
    success: false;
    errorMessage: string;
    total: number; // Dodano total do przypadku błędu
    reports: []; // Pusta tablica raportów w przypadku błędu
}
    | {
    success: true;
    reports: SubscriptionMentorReport[];
    total: number;
};
