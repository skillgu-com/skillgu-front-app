import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { formatPrice } from "src/utils/price";
import { ReportStatus, Report } from "@customTypes/reports";
import { Status } from "src/components/_base/Status";

const renderStatus = (status: ReportStatus) => {
  switch (status) {
    case "error":
      return <Status variant="danger" text="Błąd karty" />;
    case "in-progress":
      return <Status variant="warning" text="Przetwarzanie" />;
    case "paid":
      return <Status variant="success" text="Zapłacone" />;
    default:
      return null;
  }
};

export const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/mocked-reports.json");
      const data = await res.json();
      setReports(data as Report[]);
    };
    run();
  }, []);

  return (
    <section>
      <Table>
        <TableRow heading>
          <TableCell flex={1} heading text="Faktura" />
          <TableCell flex={1} heading text="Data" />
          <TableCell flex={1} heading text="Kwota" />
          <TableCell flex={2} heading text="Status" />
          <TableCell flex={3} heading text="Sesja" />
          <TableCell flex={3} heading />
        </TableRow>

        {reports
          ? reports.map((r) => (
              <TableRow>
                <TableCell flex={1}>#{r.invoiceNo}</TableCell>
                <TableCell flex={1}>
                  {formatDate(r.date, "DD MMMM YYYY")}
                </TableCell>
                <TableCell flex={1}>
                  {formatPrice(r.amount, { minimumFractionDigits: 0 })}
                </TableCell>
                <TableCell flex={2}>{renderStatus(r.status)}</TableCell>
                <TableCell flex={3}>{r.sessionTitle}</TableCell>
                <TableCell flex={3}>
                  <a href={r.invoiceFileUrl} download={r.invoiceNo}>
                    Pobierz fakturę PDF
                  </a>
                </TableCell>
              </TableRow>
            ))
          : null}

        <TableRow heading>
          <TableCell flex /*width="100%"*/>
            <Pagination
              name="reports-pagination"
              current={2}
              last={10}
              onClick={() => {}}
              // className={styles.pagination}
            />
          </TableCell>
        </TableRow>
      </Table>
    </section>
  );
};
