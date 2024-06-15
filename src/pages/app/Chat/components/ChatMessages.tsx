import { ChatContact, ChatMessage } from "@customTypes/chat";
import React from "react";

type Props = {
  selected: ChatContact | null;
  pending: boolean;
  messages: ChatMessage[];
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
  const _messages = [...messages].reverse()
  return (
    <div>
      <h3>ChatMessages</h3>
      {pending ? (<p>pending</p>) : null}
      {selected ? (
        <div>
          {total && total > messages.length ? (
            <div>
              <button onClick={loadMoreMessages}>msg skeleton</button>
            </div>
          ) : null}

          {_messages.map((m) => (
            <div key={m.id} style={{ border: '1px solid red', padding: '12px', margin: '12px' }}>
              date: {m.date} <br />
              id: {m.id} <br />
              from: {m.fromId} <br />
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <>empty</>
      )}

      {selected ? (
        <div>
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem('text') as HTMLInputElement;
            if(input){
              sendMessage(input.value);
              input.value = ""
            }
          }}>
            <textarea name="text" />
            <button>
              Send
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
