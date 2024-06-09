import React from "react";
import { ChatMessages, ChatContacts } from "./components";

export const ChatPage = () => {
  return (
    <div>
      <h1>CHAT</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <ChatContacts />
        </div>
        <div style={{ flex: 2 }}>
          <ChatMessages />
        </div>
      </div>
    </div>
  );
};
