import {ReactNode} from "react";

export type UserMessageSeverity = 'error' | 'warning' | 'info';

export type UserMessageKey = 'missingStripeIntegration';

type Message = {
        message: () => ReactNode; // message to be displayed
        severity: UserMessageSeverity; // severity of the message
        messageKey: UserMessageKey; // key to identify the message
    }

export type UserMessagesState = {
    currentMessage: null | Message;
};

export type UserMessagesAction =
    | { type: 'SET_MESSAGE'; payload: Message }
    | { type: 'CLEAR_MESSAGE', payload: { messageKey: UserMessageKey } };