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
};
