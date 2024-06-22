import { ChatContactType } from "@customTypes/chat";
import React, { useRef, useState } from "react";

import { ChatContact } from "../ChatContact";

import styles from "./ChatContacts.module.scss";

type Props = {
  pending: boolean;
  selected: ChatContactType | null;
  contacts: ChatContactType[];
  total: number | null;
  switchContact: (contact: ChatContactType) => void;
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
    <section className={styles.box}>
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
            placeholder="Szukaj"
            name="phrase"
            // value={phrase}
            // onChange={(e) => setPhrase(e.target.value)}
          />
        </fieldset>
        <button>findContacts</button>
      </form>
      <ul
        style={{
          height: "220px",
          overflow: "auto",
          listStyle: "none",
        }}
      >
        {_contacts.map((contact) => (
          <ChatContact
            key={contact.id}
            contact={contact}
            switchContact={() => switchContact(contact)}
          />
        ))}
        {total && !phrase && total > contacts.length ? (
          <button onClick={loadMoreContacts}>load more</button>
        ) : null}
      </ul>
    </section>
  );
};
