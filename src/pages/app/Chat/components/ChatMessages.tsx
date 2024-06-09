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
      // const res = await fetch(`http://localhost:3020/contacts/1/messages`);
      // const messages = await res.json();
      const messages = [
        {
          id: 1,
          from: "John Doe",
          text: "Cześć! Jak się masz?",
          date: "2024-01-01 10:10",
        },
        {
          id: 2,
          from: "You",
          text: "Cześć John! Wszystko w porządku, a Ty?",
          date: "2024-01-01 10:20",
        },
        {
          id: 3,
          from: "John Doe",
          text: "Mam się dobrze, dziękuję. Co u Ciebie słychać?",
          date: "2024-01-01 10:30",
        },
        {
          id: 4,
          from: "You",
          text: "Pracuję nad nowym projektem, jest bardzo interesujący.",
          date: "2024-01-01 10:34",
        },
        {
          id: 5,
          from: "John Doe",
          text: "To świetnie! Jakie są Twoje plany na weekend?",
          date: "2024-01-01 10:40",
        },
        {
          id: 6,
          from: "You",
          text: "Myślę o wyjeździe za miasto. A Ty?",
          date: "2024-01-01 10:45",
        },
        {
          id: 7,
          from: "John Doe",
          text: "Też mam takie plany. Może wybierzemy się razem?",
          date: "2024-01-01 10:47",
        },
        {
          id: 8,
          from: "You",
          text: "Brzmi świetnie! Gdzie chciałbyś pojechać?",
          date: "2024-01-01 10:48",
        },
        {
          id: 9,
          from: "John Doe",
          text: "Myślałem o górach. Lubisz wędrówki?",
          date: "2024-01-01 10:50",
        },
        {
          id: 10,
          from: "You",
          text: "Tak, bardzo! To będzie wspaniała przygoda.",
          date: "2024-01-01 11:00",
        },
      ];
      addMessages(messages);
      setPending(false);
    };
    if (chatState.messages.length === 0 && chatState.selectedContact) {
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
