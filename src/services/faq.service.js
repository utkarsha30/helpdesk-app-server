const mongoose = require("mongoose");
const FAQ = mongoose.model("FAQ");

const getAllFAQS = () => {
  return FAQ.find();
};
const postNewFAQ = (bodyDetails) => {
  return FAQ.create(bodyDetails);
};
const deleteFAQ = (id) => {
  return FAQ.findByIdAndDelete(id);
};
const updateFAQ = (id, faqtDetails) => {
  return FAQ.findByIdAndUpdate(id, faqtDetails, {
    returnOriginal: false,
    runValidators: true,
  });
};
module.exports = {
  postNewFAQ,
  getAllFAQS,
  deleteFAQ,
  updateFAQ,
};
