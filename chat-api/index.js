const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const WebSocket = require("ws");
const contacts = require("./data/contacts.json");
const messages = require("./data/messages.json");

const PORT = 3020;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

app.use(cors());
app.use(bodyParser.json());

wss.on("connection", (ws, req) => {
  ws.on("message", (input) => {
    const { type, payload } = JSON.parse(input);

    if (type === "load-contacts") {
      const { phrase, take, skip } = payload;
      ws.send(
        JSON.stringify({
          type: "load-contacts",
          payload: {
            contacts: contacts.slice(0, take),
            total: 100,
          },
        })
      );
    }

    if (type === "load-messages") {
      const { contactId, take, beforeMessageId } = payload;
      ws.send(JSON.stringify({ type: "load-messages", payload: {
        messages: messages[String(contactId)].slice(0, take),
        total: 100,
      } }));
    }

    if (type === "send-message") {
      const { recipient, message } = payload;
      // Save to Database
    }
  });

  ws.send(JSON.stringify({ type: "connection", text: "Welcome!" }));
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
