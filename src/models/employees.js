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
const emailPat = /^[A-Za-z0-9_\.]+@fynd\.com$/;
const passwordPat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

employeeSchema.path("email").validate(function (value) {
  return emailPat.test(value);
}, "Email should be fynd emailId");

employeeSchema.path("password").validate(function (value) {
  return passwordPat.test(value);
}, "Password must have at least 1 character , 1 digit, 1 special characters, and should be atleast 8 characters in length.");

employeeSchema.virtual("tickets", {
  ref: "Tickets",
  localField: "_id",
  foreignField: "agent", // the field in the other collection (Topic) that references a document in this collection (Workshop)
});
mongoose.model("Employee", employeeSchema);
