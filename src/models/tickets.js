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
    enum: ["high", "medium", "low"],
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    require: true,
  },
  category: {
    type: mongoose.Schema.Types.String,
    ref: "Categories",
    require: true,
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    require: true,
  },
  comment: [
    {
      name: String,
      commentTitle: String,
      commentDescription: String,
    },
  ],
});
mongoose.model("Tickets", ticketsSchema);
