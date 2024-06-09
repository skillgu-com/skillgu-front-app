import FormInputText from "@newComponents/_form/FormInputText/FormInputText";
import TextLink from "@newComponents/TextLink/TextLink";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useChatReducer } from "src/reducers/chat";

const PAGE_SIZE = 4;

export const ChatContacts = () => {
  const { chatState, addContacts, setContacts, selectContact, addMessages } =
    useChatReducer();
  const [phrase, setPhrase] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);

  const initialPhraseLoad = useRef<string>("");
  useEffect(() => {
    const loadContacts = async () => {
      // const res = await fetch(
      //   `http://localhost:3020/contacts?take=${PAGE_SIZE}`
      // );
      // const contacts = await res.json();
      const contacts = [
        {
          id: 1,
          fullName: "John Doe",
          lastMessage: "Hello!",
          avatarUrl: "",
          unreadMessages: 1,
        },
        {
          id: 2,
          fullName: "Jane Smith",
          lastMessage: "Hi there!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 4,
          fullName: "Bob Brown",
          lastMessage: "Good morning!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 5,
          fullName: "John2 Doe",
          lastMessage: "Hello!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 6,
          fullName: "Jane2 Smith",
          lastMessage: "Hi there!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 7,
          fullName: "Bob2 Brown",
          lastMessage: "Good morning!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 8,
          fullName: "John3 Doe",
          lastMessage: "Hello!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 9,
          fullName: "Jane3 Smith",
          lastMessage: "Hi there!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 10,
          fullName: "Bob3 Brown",
          lastMessage: "Good morning!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 11,
          fullName: "John4 Doe",
          lastMessage: "Hello!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 12,
          fullName: "Jane4 Smith",
          lastMessage: "Hi there!",
          avatarUrl: "",
          unreadMessages: 0,
        },
        {
          id: 13,
          fullName: "Bob4 Brown",
          lastMessage: "Good morning!",
          avatarUrl: "",
          unreadMessages: 0,
        },
      ];
      setContacts(contacts, phrase);
    };
    if (initialPhraseLoad.current !== phrase) {
      initialPhraseLoad.current = phrase;
      loadContacts();
    }
  }, [phrase, setContacts]);

  useEffect(() => {
    const loadMoreContacts = async () => {};
    loadMoreContacts();
  }, [page]);

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  console.log("chatState", chatState);

  return (
    <div>
      <h4>ChatContacts</h4>
      <fieldset>
        <legend>Szukaj</legend>
        <input
          type="text"
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
        />
      </fieldset>
      <div
        style={{
          height: "120px",
          overflow: "auto",
        }}
      >
        {chatState.contacts.map((c) => (
          <div key={c.id} style={{ margin: "20px", border: "1px solid red" }}>
            <h4>{c.fullName}</h4>
            <p>{c.lastMessage}</p>
            <p>{c.unreadMessages}</p>
            {chatState.selectedContact &&
            chatState.selectedContact?.id === c.id ? (
              <p>SELECTED</p>
            ) : (
              <button onClick={() => selectContact(c)}>Select</button>
            )}
          </div>
        ))}

        <button onClick={handleLoadMore}>load more</button>
      </div>
    </div>
  );
};
