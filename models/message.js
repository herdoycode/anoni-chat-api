import mongoose from "mongoose";

const schema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  senderImg: {
    type: String,
    require: true,
  },
});

export const Message = mongoose.model("Message", schema);
