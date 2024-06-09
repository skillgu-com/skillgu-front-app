import React, { useEffect, useRef, useState } from "react";
import { useChatReducer } from "src/reducers/chat";

export const ChatMessages = () => {
  const { chatState, addContacts, setContacts, selectContact, addMessages } =
    useChatReducer();
  const [msg, setMsg] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    const loadInitialMessages = async () => {
      setPending(true);
      const res = await fetch(`http://localhost:3020/contacts/1/messages`);
      const messages = await res.json();
      addMessages(messages);
      setPending(false);
    };
    if(chatState.messages.length === 0 && chatState.selectedContact){
      loadInitialMessages();
    }
  }, [addMessages, chatState.selectedContact, chatState.messages]);

  const handleLoadMore = () => {
    setPage((p) => p + 1);
  };

  console.log("chatState", chatState);

  return (
    <div>
      <h3>ChatMessages</h3>
      {chatState.selectedContact ? (
        <div>
          {hasNextPage ? (
            <div>
              <button>msg skeleton</button>
            </div>
          ) : null}

          {chatState.messages.map((m) => (
            <div key={m.id}>
              date: {m.date} <br />
              from: {m.from} <br />
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <>empty</>
      )}

      {chatState.selectedContact ? (
        <div>
          <textarea value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button
            onClick={() => {
              setMsg("");
            }}
          >
            Send
          </button>
        </div>
      ) : null}
    </div>
  );
};
