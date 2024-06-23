import { ChatContactType, ChatMessageType } from "@customTypes/chat";
import React from "react";
import { Message, MessageVariant } from "../Message/Message";
import styles from "./ChatMessages.module.scss";
import { Avatar } from "src/components/Avatar/Avatar";
import Button, { ButtonVariant } from "src/components/Button/Button";
import SendArrow from "@icons/SendArrow";
import BackIcon from "@icons/BackIcon";

export enum ChatMessagesVariant {
  mobile = "mobile",
  desktop = "desktop",
}

type ChatMessagesProps = {
  selected: ChatContactType | null;
  pending: boolean;
  messages: ChatMessageType[];
  total: number | null;
  sendMessage: (text: string) => void;
  loadMoreMessages: () => void;
  variant: ChatMessagesVariant;
  setIsMobileMessageShown?: (state: boolean) => void;
};

export const ChatMessages = ({
  selected,
  pending,
  messages,
  total,
  sendMessage,
  loadMoreMessages,
  variant,
  setIsMobileMessageShown,
}: ChatMessagesProps) => {
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
    <section className={styles.section} data-variant={variant}>
      {selected && (
        <header className={styles.header}>
          {setIsMobileMessageShown ? (
            <>
              <button
                className={styles.back}
                onClick={() => setIsMobileMessageShown(false)}
              >
                <BackIcon />
              </button>
              <Avatar
                size="32px"
                src={selected.avatarUrl}
                alt={`${selected.fullName} avatar`}
              />
            </>
          ) : null}

          <h4>{selected?.fullName}</h4>
        </header>
      )}
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
      </div>
      {selected ? (
        <div className={styles.formBox}>
          <form onSubmit={handleSubmit} className={styles.flex}>
            <textarea className={styles.textarea} name="text" />
            <Button
              classes={styles.button}
              variant={ButtonVariant.Primary}
              size="sm"
              type="submit"
            >
              <span>Wyślij </span>
              <SendArrow />
            </Button>
          </form>
        </div>
      ) : null}
    </section>
  );
};
