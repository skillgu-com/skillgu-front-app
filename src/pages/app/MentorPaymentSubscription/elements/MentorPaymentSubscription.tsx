import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Pagination } from "src/components/_grouped";

import { Status } from "src/components/_base/Status";
import { Scrollable } from "src/components/_base/Scrollable";
import { EmptyState } from "src/components/EmptyState";
import { Loader } from "src/components/_grouped/loader";
import { PdfIcon } from "@icons/PdfIcon";

import styles from "./styles.module.scss";

import { formatDate } from "src/utils";
import { formatPrice } from "src/utils/price";
import { fetchMentorSubscriptionPayment } from "@services/mentorSubscriptionPayment/fetchMentorSubscriptionPayment";
import { FetchPaymentSubscriptionServiceOutput } from "@customTypes/paymentReports";
import { SubscriptionMentorReportStatus } from "@customTypes/subscriptionMentorReport";

const renderStatus = (status: SubscriptionMentorReportStatus) => {
  switch (status) {
    case "requires_payment_method":
      return <Status variant="warning" text="Wymaga metody płatności" />;
    case "requires_confirmation":
      return <Status variant="info" text="Wymaga potwierdzenia" />;
    case "processing":
      return <Status variant="info" text="Przetwarzanie" />;
    case "card_error":
      return <Status variant="danger" text="Błąd karty" />;
    case "canceled":
      return <Status variant="danger" text="Anulowane" />;
    case "complete":
      return <Status variant="success" text="Zapłacone" />;
    default:
      return null;
  }
};

const PER_PAGE = 8;

export const MentorPaymentSubscription = () => {
  const [data, setData] =
    useState<FetchPaymentSubscriptionServiceOutput | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const run = async (page: number) => {
      setPending(true);
      const data = await fetchMentorSubscriptionPayment({
        take: PER_PAGE,
        skip: PER_PAGE * (page - 1),
      });
      setData(data);
      setPending(false);
    };
    run(page);
  }, [page]);

  return pending ? (
    <Loader spinner spinnerSize="lg" shadow overlay="global" />
  ) : data === null ? (
    <div className={styles.alert}>
      <p>Brak danych</p>
    </div>
  ) : data && data.success && data.reports.length ? (
    <section>
      <Table>
        <Scrollable minWidth={"920px"}>
          <TableRow heading>
            <TableCell width="100px" heading text="Faktura" />
            <TableCell flex={2} heading text="Data ważności" />
            <TableCell flex={1} heading text="Kwota" />
            <TableCell width="167px" heading text="Status" />
            <TableCell flex={1} heading text="Sesja" />
            <TableCell width="190px" heading />
          </TableRow>

          {data.reports
            ? data.reports.map((r) => (
                <TableRow key={r.id} borderTop>
                  <TableCell width="100px">{r.invoiceNo}</TableCell>
                  <TableCell flex={2}>
                    {`${formatDate(r.startDate, "DD.MM.YYYY")} - ${formatDate(r.endDate, "DD.MM.YYYY")}`}
                  </TableCell>
                  <TableCell flex={1}>
                    {formatPrice(r.amount, { minimumFractionDigits: 0 })}
                  </TableCell>
                  <TableCell width="167px">{renderStatus(r.status)}</TableCell>
                  <TableCell flex={1}>{r.planName}</TableCell>
                  <TableCell width="190px" noPadding>
                    <a
                      href={r.invoiceFileUrl}
                      download={r.invoiceNo}
                      className={styles.pdfBtn}
                    >
                      Pobierz fakturę <PdfIcon />
                    </a>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </Scrollable>
        <TableRow heading borderTop>
          <TableCell flex /*width="100%"*/>
            <Pagination
              name="reports-pagination"
              current={page}
              last={Math.ceil(data.total / PER_PAGE)}
              onClick={(e) => {
                const btn = e.currentTarget as HTMLButtonElement;
                setPage(Number(btn.value));
              }}
              className={styles.pagination}
              fullWidth
            />
          </TableCell>
        </TableRow>
      </Table>
    </section>
  ) : (
    <Table>
      <Scrollable minWidth={"400px"}>
        <TableRow heading className={styles.emptyStateHeading}>
          <TableCell heading text="Faktura" />
          <TableCell heading text="Data ważności" />
          <TableCell heading text="Kwota" />
          <TableCell heading text="Status" />
          <TableCell heading text="Plan" />
        </TableRow>
        <TableCell flex className={styles.emptyCell}>
          <EmptyState text="Nie znaleziono żadnych Twoich subskrypcji" />
        </TableCell>
      </Scrollable>
    </Table>
  );
};
