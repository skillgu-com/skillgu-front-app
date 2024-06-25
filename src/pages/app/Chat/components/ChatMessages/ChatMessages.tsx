import React, { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { Message, MessageVariant, MessageRowSkeleton } from "../Message";
import { Avatar } from "src/components/Avatar/Avatar";
import Button, { ButtonVariant } from "src/components/Button/Button";
import SendArrow from "@icons/SendArrow";
import BackIcon from "@icons/BackIcon";

import styles from "./ChatMessages.module.scss";

import { ChatContactType, ChatMessageType } from "@customTypes/chat";

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
  
  const _messages = useMemo(() => [...messages].reverse(), [messages]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem("text") as HTMLInputElement;
    if (input.value) {
      sendMessage(input.value);
      input.value = "";
    }
  };

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: pending,
    // hasNextPage: total ? total > messages.length : false,
    hasNextPage: true,
    onLoadMore: loadMoreMessages,
    //disabled: !!error,
    rootMargin: "500px 0px 0px 0px",
  });

  // Docs
  const scrollableRootRef = useRef<HTMLDivElement | null>(null);
  const lastScrollDistanceToBottomRef = useRef<number>();
  console.log(scrollableRootRef);
  // We keep the scroll position when new items are added etc.
  useLayoutEffect(() => {
    const scrollableRoot = scrollableRootRef.current;
    const lastScrollDistanceToBottom =
      lastScrollDistanceToBottomRef.current ?? 0;
    if (scrollableRoot) {
      scrollableRoot.scrollTop =
        scrollableRoot.scrollHeight - lastScrollDistanceToBottom;
    }
  }, [_messages, rootRef]);

  const rootRefSetter = useCallback(
    (node: HTMLDivElement) => {
      rootRef(node);
      scrollableRootRef.current = node;
    },
    [rootRef]
  );

  const handleRootScroll = React.useCallback(() => {
    const rootNode = scrollableRootRef.current;
    if (rootNode) {
      const scrollDistanceToBottom = rootNode.scrollHeight - rootNode.scrollTop;
      lastScrollDistanceToBottomRef.current = scrollDistanceToBottom;
    }
  }, []);

  return (
    <section className={styles.section} data-variant={variant}>
      {selected ? (
        <>
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
          <div
            className={styles.box}
            ref={rootRefSetter}
            onScroll={handleRootScroll}
          >
            {total && total > messages.length ? (
              <div ref={sentryRef}>
                <MessageRowSkeleton />
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
                <div key={m.id} className={styles.msgBox}>
                  <Message key={m.id} variant={MessageVariant.response}>
                    {m.text}
                  </Message>
                </div>
              )
            )}
          </div>
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
        </>
      ) : (
        <p>Wybierz kontakt</p>
      )}
    </section>
  );
};
