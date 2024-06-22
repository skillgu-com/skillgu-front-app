import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessages, ChatContacts } from "./components";
import WebSocketInstance from "@services/chat/chat.service";
import { ChatContactType, ChatMessageType } from "@customTypes/chat";
import {
  ChatContactsOutput,
  ChatMessagesOutput,
} from "@services/chat/chat.service.types";
import { Tag } from "@customTypes/tags";
import { TitleTag, TitleVariant } from "src/components/typography/Title/Title";
import { Text, Title } from "src/components/typography";
import Container from "src/components/Container/Container";

import styles from "./ChatPage.module.scss";

type ChatMessageWithOptimistic = ChatMessageType & {
  optimistic?: true;
};

export const ChatPage = () => {
  const userId = 0;
  const [messages, setMessages] = useState<ChatMessageWithOptimistic[]>([]);
  const [contacts, setContacts] = useState<ChatContactType[]>([]);
  const [totalContacts, setTotalContacts] = useState<number | null>(null);
  const [totalMessages, setTotalMessages] = useState<number | null>(null);
  const [selected, setSelected] = useState<ChatContactType | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const [pendingContacts, setPendingContacts] = useState<boolean>(false);
  const [pendingMessages, setPendingMessages] = useState<boolean>(false);
  const lastMsgId = useRef<number | null>(null);

  const sendMessage = useCallback(
    (text: string) => {
      if (!selected) {
        return;
      }
      WebSocketInstance.sendMessage({
        recipient: selected?.id,
        text,
      });
      // Optimistic update
      const newMsg: ChatMessageWithOptimistic = {
        id: new Date().getTime(),
        fromId: userId,
        date: new Date().toISOString(),
        text: text,
        optimistic: true,
      };
      setMessages((curr) => {
        const newMessages = [newMsg, ...curr].sort(
          (a, b) => new Date(b.date).getTime() + new Date(a.date).getTime()
        );
        return newMessages;
      });
    },
    [selected]
  );

  const switchContact = useCallback((newSelected: ChatContactType) => {
    WebSocketInstance.switchContact({
      contactId: newSelected.id,
    });
    setSelected(newSelected);
  }, []);

  const loadMoreContacts = useCallback(() => {
    WebSocketInstance.loadContacts({
      take: 2,
      skip: contacts.length,
    });
  }, [contacts.length]);

  const loadMoreMessages = useCallback(() => {
    if (!selected || !lastMsgId.current) {
      return;
    }
    WebSocketInstance.loadMessages({
      contactId: selected.id,
      take: 2,
      beforeMessageId: lastMsgId.current,
    });
  }, [selected]);

  const findContacts = useCallback((phrase: string) => {
    if (phrase) {
      WebSocketInstance.loadContacts({
        phrase,
        take: 5,
        skip: 0,
      });
    }
  }, []);

  useEffect(() => {
    if (selected) {
      setMessages([]);
      WebSocketInstance.setLoadMessagesCallback(
        (data: ChatMessagesOutput["payload"]) => {
          setPendingMessages(false);
          setTotalMessages(data.total);
          setMessages((curr) => {
            const filteredMessages: ChatMessageType[] = curr
              .filter((c) => !c.optimistic)
              .map((c) => {
                const replacedContact = data.messages.find(
                  (dm) => dm.id === c.id
                );
                if (replacedContact) {
                  return replacedContact;
                }
                return c;
              });
            const newMessages: ChatMessageType[] = data.messages.filter((m) => {
              return !filteredMessages.includes(m);
            });
            const newMessagesList = [...filteredMessages, ...newMessages];
            newMessagesList.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            lastMsgId.current = newMessagesList[newMessagesList.length - 1].id;
            return newMessagesList;
          });
        }
      );
      WebSocketInstance.loadMessages({
        contactId: selected.id,
        take: 2,
      });
    }
  }, [selected]);

  useEffect(() => {
    WebSocketInstance.setLoadContactsCallback(
      (data: ChatContactsOutput["payload"]) => {
        setPendingContacts(false);
        setTotalContacts(data.total);
        setSelected((curr) => curr ?? data.contacts[0]);
        setContacts((curr) => {
          const filteredContacts: ChatContactType[] = curr.map((c) => {
            const replacedContact = data.contacts.find((dc) => dc.id === c.id);
            if (replacedContact) {
              return replacedContact;
            }
            return c;
          });
          const newContacts: ChatContactType[] = data.contacts.filter((c) => {
            return !filteredContacts.includes(c);
          });
          const newContactsList = [...filteredContacts, ...newContacts];
          newContactsList.sort((a, b) => {
            return (
              new Date(b.lastMessageDate).getTime() -
              new Date(a.lastMessageDate).getTime()
            );
          });
          return newContactsList;
        });
      }
    );
  }, []);

  useEffect(() => {
    WebSocketInstance.setOnOpenCallback(() => {
      setConnected(true);
    });

    WebSocketInstance.connect();

    return () => {
      WebSocketInstance.closeSocket();
    };
  }, []);

  return (
    <main>
      <Container as={Tag.Section} classes={styles.container}>
        <header className={styles.header}>
          <Title
            tag={TitleTag.h2}
            variant={TitleVariant.section}
            classes={styles.title}
          >
            Wiadomości
          </Title>
          {/* TODO */}
          <p className={styles.unreadMsg}>{`${10} nieprzeczytanych`}</p>
        </header>

        <div className={styles.gridContainer}>
          <ChatContacts
            pending={pendingContacts}
            selected={selected}
            contacts={contacts}
            switchContact={switchContact}
            loadMoreContacts={loadMoreContacts}
            findContacts={findContacts}
            total={totalContacts}
          />
          <ChatMessages
            selected={selected}
            pending={pendingMessages}
            messages={messages}
            sendMessage={sendMessage}
            loadMoreMessages={loadMoreMessages}
            total={totalMessages}
          />
        </div>
      </Container>
    </main>
  );
};
