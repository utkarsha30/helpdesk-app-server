const TicketsService = require("../services/tickets.service");
const { Errors } = require("../constants");
const getAllTickets = async (req, res, next) => {
  try {
    const tickets = await TicketsService.getAllTickets();
    res.json({
      status: "success",
      data: tickets,
    });
  } catch (error) {
    next(error);
  }
};
const getTicketById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const match = await TicketsService.getTicketById(id);
    if (!match) {
      const error = new Error(`A client with ${id} does not exist`);
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
const postNewTicket = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new ticket`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const newTicket = await TicketsService.postNewTicket(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
};
const updateTicket = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of ticket to be updated`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const updatedTicket = await TicketsService.updateTicket(id, req.body);
    if (updatedTicket === null) {
      const error = new Error(`A ticket with id = ${id} does not exist`);
      error.name = Errors.NotFound;

      return next(error);
    }
    res.json(updatedTicket);
  } catch (error) {
    next(error);
  }
};

const postComment = async (req, res, next) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have details of comment to post it`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const postComment = await TicketsService.postComment(id, req.body);
    if (postComment === null) {
      const error = new Error(
        `A ticket with id = ${id} does not exist to post comment`
      );
      error.name = Errors.NotFound;

      return next(error);
    }
    res.json(postComment);
  } catch (error) {
    next(error);
  }
};
const deleteTicket = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedTicket = await TicketsService.deleteTicket(id);
    if (deletedTicket === null) {
      const error = new Error(`A ticket with id = ${id} does not exist`);
      error.name = Errors.NotFound;
      return next(error);
    }
    res.json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  postNewTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  postComment,
  deleteTicket,
};
