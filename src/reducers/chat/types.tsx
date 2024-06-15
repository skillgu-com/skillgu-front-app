import { ChatContact, ChatMessage } from "@customTypes/chat";

export type ActionType =
  | "ADD_CONTACTS"
  | "SET_CONTACTS"
  | "SELECT_CONTACT"
  | "ADD_MESSAGES"
  | "SET_PHRASE"
  | "SEND_MESSAGE";

export type ChatState = {
  contacts: ChatContact[];
  selectedContact: ChatContact | null;
  messages: ChatMessage[];
  phrase: string;
};

export type ChatAction =
  | { type: "ADD_CONTACTS"; payload: { contacts: ChatContact[] } }
  | { type: "SET_CONTACTS"; payload: { contacts: ChatContact[], phrase: string } }
  | { type: "SELECT_CONTACT"; payload: { selectedContact: ChatContact } }
  | { type: "ADD_MESSAGES"; payload: { messages: ChatMessage[] } }
  // | { type: "SET_PHRASE"; payload: { phrase: string } }
  | { type: "SEND_MESSAGE"; payload: { message: ChatMessage } };
