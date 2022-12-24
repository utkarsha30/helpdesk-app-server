const mongoose = require("mongoose");
const Client = mongoose.model("Client");
const getAllClients = () => {
  return Client.find();
};
const getClientById = (_id) => {
  return Client.findById(_id).populate("tickets");
};
const postClientDetails = (bodyDetails) => {
  return Client.create(bodyDetails);
};
module.exports = {
  getAllClients,
  postClientDetails,
  getClientById,
};
