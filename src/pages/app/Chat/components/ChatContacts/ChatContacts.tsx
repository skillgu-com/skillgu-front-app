import { ChatContactType } from "@customTypes/chat";
import React, { useEffect, useState } from "react";

import { ChatContact } from "../ChatContact";

import styles from "./ChatContacts.module.scss";
import { SearchInput } from "src/components/SearchInput";
import { useDebounce } from "src/hooks/useDebounce";

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
  const debouncePhrase = useDebounce(phrase);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPhrase(e.target.value);
  };

  useEffect(() => {
    if (!debouncePhrase) return;
    findContacts(debouncePhrase);
  }, [debouncePhrase]);

  const _contacts = phrase
    ? contacts.filter((c) =>
        c.fullName.toLowerCase().includes(phrase.toLowerCase())
      )
    : contacts;

  return (
    <section className={styles.box}>
      {pending ? <p>pending</p> : null}
      <SearchInput
        placeholder="Szukaj"
        name="phrase"
        value={phrase}
        onChangePhrase={handleInputChange}
      />
      <ul
        className={styles.list}
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
