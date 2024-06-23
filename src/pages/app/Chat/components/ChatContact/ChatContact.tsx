import React, { MouseEventHandler } from "react";

import { Avatar } from "src/components/Avatar/Avatar";

import styles from "./ChatContact.module.scss";
import { ChatContactType } from "@customTypes/chat";

type ChatContactProps = {
  contact: ChatContactType;
  switchContact: MouseEventHandler<HTMLButtonElement>;
};

export const ChatContact = ({
  contact: { id, avatarUrl, fullName, lastMessage, unreadMessages },
  switchContact,
}: ChatContactProps) => {
  const generateShortMsg = (message: string) => {
    return message.length > 25 ? `${message.slice(0, 25)}...` : message;
  };

  return (
    <li>
      <button onClick={switchContact} className={styles.button}>
        <Avatar src={avatarUrl} alt={`${fullName} avatar`} />
        <div>
          <h4 className={styles.title}>{fullName}</h4>
          <p className={styles.message}>{generateShortMsg(lastMessage)}</p>
        </div>
        {unreadMessages ?<div className={styles.unread}><p>{unreadMessages}</p></div> : null}
      </button>
    </li>
  );
};
