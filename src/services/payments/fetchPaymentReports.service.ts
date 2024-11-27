import axios from "axios";
import {FetchPaymentReportsServiceInput, FetchPaymentReportsServiceOutput} from "@customTypes/paymentReports";

export const fetchPaymentReports = async ({
                                              take = 5,
                                              skip = 0,
                                          }: FetchPaymentReportsServiceInput): Promise<FetchPaymentReportsServiceOutput> => {
    try {
        const response = await axios.get('/api/payment/reports', {
            params: {
                take,
                skip,
            },
        });
        const data = response.data.data;

        return {
            total: data?.total ?? 0,
            reports: Array.isArray(data?.reports)
                ? data.reports.map((item: any) => ({
                    id: item?.id ?? 0,
                    invoiceNo: item?.invoiceNo ?? "",
                    date: item?.date ?? "",
                    amount: item?.amount ?? 0,
                    status: item?.status,
                    sessionTitle: item?.sessionTitle ?? "",
                    invoiceFileUrl: item?.invoiceFileUrl ?? "",
                }))
                : [], // Domyślna pusta tablica raportów
            success: true, // Dodano pole success
        };
    } catch (error) {
        console.error('Error fetching payment reports:', error);

        return {
            total: 0, // Domyślna wartość dla total
            reports: [], // Domyślna pusta lista raportów
            success: false, // Dodano pole success dla błędu
            errorMessage: 'Nie udało się pobrać raportów płatności', // Dodano pole errorMessage
        };
    }
};





