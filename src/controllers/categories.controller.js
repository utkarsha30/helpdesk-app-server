const CategoriesService = require("../services/categories.service");
const { Errors } = require("../constants");
const getAllCategories = async (req, res, next) => {
  try {
    const Categories = await CategoriesService.getAllCategories();
    res.json(Categories);
  } catch (error) {
    next(error);
  }
};
const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const match = await CategoriesService.getCategoryById(id);
    if (!match) {
      const error = new Error(`Category with ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.json({
      status: "success",
      data: match,
    });
  } catch (error) {
    next(error);
  }
};
const postNewCategory = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new FAQ`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const newCategory = await CategoriesService.postNewCategory(req.body);
    res.status(201).json({
      status: "success",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllCategories,
  postNewCategory,
  getCategoryById,
};
