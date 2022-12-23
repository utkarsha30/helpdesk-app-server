const mongoose = require("mongoose");
require("../models/client");
require("../models/tickets");
require("../models/faq");
require("../models/categories");
require("../models/employees");
const connect = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to db");
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
module.exports = {
  connect,
};
