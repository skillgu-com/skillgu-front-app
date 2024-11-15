export type SessionStatus = 'in-progress' | 'planned' | 'cancelled' | 'completed' | 'accepted' | 'rejected' | 'awaiting' | 'active' | 'suspended';

export type SessionRowType = {
    id: number,
    userName: string,
    avatarUrl: string,
    fullName: string,
    date: string,
    status: SessionStatus,
    serviceType: string,
    serviceName: string,
};

export type SessionsState = {
    pending: boolean;
    errorMessage: string;
    page: number;
    totalRecords: number;
    sessions: SessionRowType[];
};

export type SessionsActionType =
    | "SESSIONS_UPDATE_PENDING"
    | "SESSIONS_UPDATE_STATUS"
    | "SESSIONS_UPDATE_PAGE"
    | "SESSIONS_UPDATE_RECORDS"
    | "SESSIONS_RESET";

export type SessionsAction =
    | {
    type: "SESSIONS_UPDATE_PAGE";
    payload: {
        page: number;
    };
}
    | {
    type: "SESSIONS_UPDATE_RECORDS";
    payload: {
        totalRecords: number;
        sessions: SessionRowType[];
    };
}
    | {
    type: "SESSIONS_UPDATE_PENDING";
    payload: { pending: boolean };
}
    | {
    type: "SESSIONS_UPDATE_STATUS";
    payload: { errorMessage: string };
}
    | {
    type: "SESSIONS_RESET";
};
