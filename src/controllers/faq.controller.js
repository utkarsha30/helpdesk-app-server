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
    res.status(201).json({
      status: "success",
      data: newFAQ,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postNewFAQ,
  getAllFAQS,
};
