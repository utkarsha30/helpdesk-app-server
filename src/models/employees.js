const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      emu: ["admin", "agent"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
employeeSchema.virtual("tickets", {
  ref: "Tickets",
  localField: "_id",
  foreignField: "agent", // the field in the other collection (Topic) that references a document in this collection (Workshop)
});
mongoose.model("Employee", employeeSchema);
