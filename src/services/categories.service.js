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
const deleteCategory = (id) => {
  return Categories.findByIdAndDelete(id);
};
const updateCategory = (id, categorytDetails) => {
  return Categories.findByIdAndUpdate(id, categorytDetails, {
    returnOriginal: false,
    runValidators: true,
  });
};
module.exports = {
  postNewCategory,
  getCategoryById,
  getAllCategories,
  deleteCategory,
  updateCategory,
};
