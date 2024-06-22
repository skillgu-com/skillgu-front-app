import { ChatContactType, ChatMessageType } from "@customTypes/chat";
import React from "react";
import { Message, MessageVariant } from "../Message/Message";
import styles from "./ChatMessages.module.scss";
import { Avatar } from "src/components/Avatar/Avatar";
import Button, { ButtonVariant } from "src/components/Button/Button";
type Props = {
  selected: ChatContactType | null;
  pending: boolean;
  messages: ChatMessageType[];
  total: number | null;
  sendMessage: (text: string) => void;
  loadMoreMessages: () => void;
};

export const ChatMessages = ({
  selected,
  pending,
  messages,
  total,
  sendMessage,
  loadMoreMessages,
}: Props) => {
  const _messages = [...messages].reverse();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("text") as HTMLInputElement;
    if (input.value) {
      sendMessage(input.value);
      input.value = "";
    }
  };

  return (
    <section>
      {selected && <h4 className={styles.title}>{selected?.fullName}</h4>}
      <div className={styles.box}>
        {pending ? <p>pending</p> : null}
        {selected ? (
          <div>
            {total && total > messages.length ? (
              <div>
                <button onClick={loadMoreMessages}>msg skeleton</button>
              </div>
            ) : null}

            {_messages.map((m) =>
              Number(m.fromId) ? (
                <div key={m.id} className={styles.flex}>
                  <Avatar
                    classes={styles.avatar}
                    size="32px"
                    src={selected.avatarUrl}
                    alt={`${selected.fullName} avatar`}
                  />
                  <Message variant={MessageVariant.message}>{m.text}</Message>
                </div>
              ) : (
                <Message key={m.id} variant={MessageVariant.response}>
                  {m.text}
                </Message>
              )
            )}
          </div>
        ) : (
          <>empty</>
        )}

        {selected ? (
          <div>
            <form onSubmit={handleSubmit} className={styles.flex}>
              <textarea className={styles.textarea} name="text" />
              <Button variant={ButtonVariant.Primary} size="sm" type="submit">
                Wyślij
              </Button>
            </form>
          </div>
        ) : null}
      </div>
    </section>
  );
};
