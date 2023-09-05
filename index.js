import { Server } from "socket.io";
import express from "express";

const app = express();

const server = app.listen(9000, () => console.log("Listening on port 9000"));

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    io.emit("getMessage", message);
  });
});
