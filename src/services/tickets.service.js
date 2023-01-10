const mongoose = require("mongoose");
const Tickets = mongoose.model("Tickets");

const getAllTickets = () => {
  return Tickets.find();
};
const getTicketById = (_id) => {
  return Tickets.findById(_id);
};
const postNewTicket = (bodyDetails) => {
  return Tickets.create(bodyDetails);
};
const postAttachments = (id, image) => {
  return Tickets.findByIdAndUpdate(id, image, {
    returnOriginal: false,
    runValidators: true,
  });
};
const updateTicket = (id, ticketDetails) => {
  return Tickets.findByIdAndUpdate(id, ticketDetails, {
    returnOriginal: false,
    runValidators: true,
  });
};
const postComment = (id, ticketDetails) => {
  return Tickets.findByIdAndUpdate(
    id,
    { $push: ticketDetails },
    {
      returnOriginal: false,
      runValidators: true,
    }
  );
};
const getClientTicketsSummary = (id) => {
  const _id = mongoose.Types.ObjectId(id);
  return Tickets.aggregate([
    {
      $match: {
        client: _id,
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);
};
const deleteTicket = (id) => {
  return Tickets.findByIdAndDelete(id);
};
module.exports = {
  postNewTicket,
  getTicketById,
  getAllTickets,
  updateTicket,
  postComment,
  deleteTicket,
  getClientTicketsSummary,
  postAttachments,
};
