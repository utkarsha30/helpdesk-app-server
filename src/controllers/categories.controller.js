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
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};
const deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCategory = await CategoriesService.deleteCategory(id);
    if (deletedCategory === null) {
      const error = new Error(`The Category with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.json(deletedCategory);
  } catch (error) {
    next(error);
  }
};
const updateCategory = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of category to be updated`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const updatedCategory = await CategoriesService.updateCategory(
      id,
      req.body
    );
    if (updatedCategory === null) {
      const error = new Error(`A Category with id = ${id} does not exist`);
      error.name = Errors.NotFound;

      return next(error);
    }
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  postNewCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
};
