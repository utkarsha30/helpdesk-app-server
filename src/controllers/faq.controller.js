const FAQService = require("../services/faq.service");
const { Errors } = require("../constants");
const getAllFAQS = async (req, res, next) => {
  try {
    const FAQS = await FAQService.getAllFAQS();
    res.json(FAQS);
  } catch (error) {
    next(error);
  }
};
postNewFAQ = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new FAQ`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const newFAQ = await FAQService.postNewFAQ(req.body);
    res.status(201).json(newFAQ);
  } catch (error) {
    next(error);
  }
};
const deleteFAQ = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedFAQ = await FAQService.deleteFAQ(id);
    if (deletedFAQ === null) {
      const error = new Error(`The Category with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.json(deletedFAQ);
  } catch (error) {
    next(error);
  }
};
const updateFAQ = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of category to be updated`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const updatedFAQ = await FAQService.updateFAQ(id, req.body);
    if (updatedFAQ === null) {
      const error = new Error(`FAQ with id = ${id} does not exist`);
      error.name = Errors.NotFound;

      return next(error);
    }
    res.json(updatedFAQ);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postNewFAQ,
  getAllFAQS,
  deleteFAQ,
  updateFAQ,
};
