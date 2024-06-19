import express from "express";
import { BoxRouter } from "./routers/box.js";
import { Server } from "socket.io";
import http from "node:http";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// eslint-disable-next-line no-undef
const port = process.env.PORT ?? 3000;
let lastText = "";
app.use("/", BoxRouter);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("write", (text, party) => {
    if (lastText !== text) {
      console.log("a user writed: ", text, "from party: ", party);
      lastText = text;
      socket.broadcast.emit("write", text, party);
    }
  });
});

server.listen(port, () => {
  console.log(`listening on *:3000`);
});
