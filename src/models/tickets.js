const mongoose = require("mongoose");
const ticketsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attachments: {
    type: String,
  },
  status: {
    type: String,
    default: "open",
    enum: ["open", "processing", "pending", "closed"],
  },
  priority: {
    type: String,
    default: "low",
    enum: ["high", "medium", "low"],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.String,
    ref: "Categories",
    required: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  comments: [
    {
      name: String,
      comment: String,
    },
  ],
});
mongoose.model("Tickets", ticketsSchema);
