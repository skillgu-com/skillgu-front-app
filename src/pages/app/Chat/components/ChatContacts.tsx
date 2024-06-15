import { ChatContact } from "@customTypes/chat";
import React, { useRef, useState } from "react";

type Props = {
  pending: boolean;
  selected: ChatContact | null;
  contacts: ChatContact[];
  total: number | null;
  switchContact: (contact: ChatContact) => void;
  loadMoreContacts: () => void;
  findContacts: (phrase: string) => void;
};

export const ChatContacts = ({
  pending,
  selected,
  contacts,
  total,
  switchContact,
  loadMoreContacts,
  findContacts,
}: Props) => {
  const [phrase, setPhrase] = useState<string>("");
  const _contacts = phrase
    ? contacts.filter((c) => c.fullName.includes(phrase))
    : contacts;

  return (
    <div>
      <h4>ChatContacts</h4>
      {pending ? <p>pending</p> : null}
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const input = form.elements.namedItem("phrase") as HTMLInputElement;
          findContacts(input.value);
          // phraseRef.current = input.value
          setPhrase(input.value);
        }}
      >
        <fieldset>
          <legend>Szukaj</legend>
          <input
            type="text"
            name="phrase"
            // value={phrase}
            // onChange={(e) => setPhrase(e.target.value)}
          />
        </fieldset>
        <button>findContacts</button>
      </form>
      <div
        style={{
          height: "220px",
          overflow: "auto",
        }}
      >
        {_contacts.map((c) => (
          <div key={c.id} style={{ margin: "20px", border: "1px solid red" }}>
            <h4>{c.fullName}</h4>
            <p>{c.lastMessage}</p>
            <p>{c.unreadMessages}</p>
            {selected && selected?.id === c.id ? (
              <p>SELECTED</p>
            ) : (
              <button onClick={() => switchContact(c)}>Select</button>
            )}
          </div>
        ))}

        {total && !phrase && total > contacts.length ? (
          <button onClick={loadMoreContacts}>load more</button>
        ) : null}
      </div>
    </div>
  );
};
