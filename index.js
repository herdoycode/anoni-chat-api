import { Server } from "socket.io";
import "express-async-errors";
import cors from "cors";
import express from "express";
import messages from "./routes/messages.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { error } from "./middlewares/error.js";

dotenv.config();

const app = express();
app.use(error);

const port = process.env.PORT || 9000;

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/messages", messages);

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

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(() => console.log("Could not connected to MongoDB..."));
