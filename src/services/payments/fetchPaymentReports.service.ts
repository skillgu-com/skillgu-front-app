import {
  FetchPaymentReportsServiceInput,
  FetchPaymentReportsServiceOutput,
} from "./fetchPaymentReports.types";

export const fetchPaymentReports = async ({
  take = 10,
  skip = 0,
  sortBy,
  sortMethod,
}: FetchPaymentReportsServiceInput): Promise<FetchPaymentReportsServiceOutput> => {
  const res = await fetch("/mocked-reports.json");
  const data = await res.json();

  const start = skip;
  const end = start + take;

  const reports = data.slice(start, end);

  return {
    reports,
    total: data.length,
    success: true,
  } as FetchPaymentReportsServiceOutput;
};
