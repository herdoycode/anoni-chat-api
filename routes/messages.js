import express from "express";
import { Message } from "../models/message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

router.post("/", async (req, res) => {
  const { senderId, senderImg, text } = req.body;
  const message = new Message({
    senderId,
    senderImg,
    text,
  });
  await message.save();
  res.send(message);
});

export default router;
