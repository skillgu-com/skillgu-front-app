import {SessionsState} from "@customTypes/session";

export const sessionsInitialState: SessionsState = {
  pending: true,
  errorMessage: '',
  page: 1,
  totalRecords: 0,
  sessions: [],
};

export const PER_PAGE = 5
