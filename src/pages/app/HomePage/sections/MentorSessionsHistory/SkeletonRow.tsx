import React, { useCallback, useEffect, useRef, useState } from "react";
import clx from "classnames";
import styles from "./MentorSessionsHistory.module.scss";
import { fetchMentorSessions } from "@services/mentor/fetchMentorSessions.service";
import { useSessionsReducer, PER_PAGE } from "src/reducers/sessions";
import { Table, TableCell, TableRow } from "src/components/_base/Table";
import { Pagination } from "src/components/_grouped";
import { formatDate } from "src/utils";
import { formatPrice } from "src/utils/price";
import { ReportStatus, Report } from "@customTypes/reports";
import { Status } from "src/components/_base/Status";
import { OverflowMenu } from "src/components/_grouped/overflow-menu/OverflowMenu";
import { OverflowMenuToggle } from "src/components/_grouped/overflow-menu/OverflowMenuToggle";
import { OverflowMenuList } from "src/components/_grouped/overflow-menu/OverflowMenuList";
import { OverflowMenuOption } from "src/components/_grouped/overflow-menu/OverflowMenuOption";
import { useNavigate } from "react-router-dom";
import { Spinner } from "src/components/_base/Spinner";
import { Loader } from "src/components/_grouped/loader";
import { Skeleton } from "@mui/material";

export const SkeletonRow = () => {
  return (
    <TableRow>
      <TableCell flex={4} heading>
        <div className={styles.userCol}>
          <Skeleton
            className={styles.img}
            variant="circular"
            width={20}
            height={20}
          />
          <Skeleton
            className={styles.name}
            style={{ width: "160px" }}
            variant="text"
            sx={{ fontSize: "1em" }}
          />
        </div>
      </TableCell>
      <TableCell flex={3} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={3} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={3} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={4} heading>
        <Skeleton
          className={styles.name}
          style={{ width: "160px" }}
          variant="text"
          sx={{ fontSize: "1em" }}
        />
      </TableCell>
      <TableCell flex={1} heading></TableCell>
    </TableRow>
  );
};
