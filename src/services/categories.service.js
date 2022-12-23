const mongoose = require("mongoose");
const Categories = mongoose.model("Categories");
const postNewCategory = (bodyDetails) => {
  return Categories.create(bodyDetails);
};
const getAllCategories = () => {
  return Categories.find();
};
const getCategoryById = (_id) => {
  return Categories.findById(_id).populate("tickets");
};
module.exports = {
  postNewCategory,
  getCategoryById,
  getAllCategories,
};
