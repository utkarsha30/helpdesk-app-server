const mongoose = require("mongoose");
const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
categoriesSchema.virtual("tickets", {
  ref: "Tickets",
  localField: "name",
  foreignField: "category", // the field in the other collection (Topic) that references a document in this collection (Workshop)
});
mongoose.model("Categories", categoriesSchema);
