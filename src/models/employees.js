const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
      enum: ["admin", "agent"],
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

// decides the "Strength" of the salt (should not be higher as salting will take long time and occupy CPU time (blocking) - nothing else will execute in the app in that time)
const SALT_FACTOR = 10;
console.log(this); // global / window

employeeSchema.pre("save", function (done) {
  // DO NOT use arrow function here
  const user = this; // const user -> new User()

  if (!user.isModified("password")) {
    done();
    return;
  }

  // genSalt() is async
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return done(err); // Mongoose will not insert the user document
    }

    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        return done(err);
      }

      user.password = hashedPassword;
      done(); // pass no arguments to done() to signify success
    });
  });

  console.log("executes immediately");
});
mongoose.model("Employee", employeeSchema);
