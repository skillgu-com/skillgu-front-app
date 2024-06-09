import { chatInitialState } from "./constants";
import { useDispatch, useSelector } from "react-redux";
import { ChatState } from "./types";
import { ChatContact, ChatMessage } from "@customTypes/chat";
import { useCallback, useMemo } from "react";

type Output = {
  chatState: ChatState;
  addContacts: (contacts: ChatContact[]) => void;
  setContacts: (contacts: ChatContact[], phrase: string) => void;
  selectContact: (contact: ChatContact) => void;
  addMessages: (messages: ChatMessage[]) => void;
};

export const useChatReducer = (): Output => {
  const chatState: ChatState = useSelector((state) => {
    if (state && typeof state === "object" && "chat" in state) {
      return state?.chat as ChatState;
    }
    return chatInitialState;
  });
  const dispatch = useDispatch();

  const addContacts = useCallback(
    (contacts: ChatContact[]) =>
      dispatch({
        type: "ADD_CONTACTS",
        payload: {
          contacts,
        },
      }),
    [dispatch]
  );

  const setContacts = useCallback(
    (contacts: ChatContact[], phrase: string) =>
      dispatch({
        type: "SET_CONTACTS",
        payload: {
          contacts,
          phrase,
        },
      }),
    [dispatch]
  );

  const selectContact = useCallback(
    (selectedContact: ChatContact) =>
      dispatch({
        type: "SELECT_CONTACT",
        payload: {
          selectedContact,
        },
      }),
    [dispatch]
  );

  const addMessages = useCallback(
    (messages: ChatMessage[]) =>
      dispatch({
        type: "ADD_MESSAGES",
        payload: {
          messages,
        },
      }),
    [dispatch]
  );

  return {
    chatState: chatState,
    addContacts,
    setContacts,
    selectContact,
    addMessages,
  };
};
