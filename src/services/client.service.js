const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Client = mongoose.model("Client");
const getAllClients = () => {
  return Client.aggregate([
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
      },
    },
  ]);
};
const getClientById = (_id) => {
  return Client.findById(_id).populate("tickets");
};
const getClientEmailId = (id) => {
  const clientId = mongoose.Types.ObjectId(id);
  return Client.findOne(
    {
      _id: clientId,
    },
    {
      _id: 0,
      email: 1,
    }
  );
};
const postClientDetails = (bodyDetails) => {
  return Client.create(bodyDetails);
};
const validateUser = async (loginUser) => {
  const user = await Client.findOne({
    email: loginUser.email,
  });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(loginUser.password, user.password);

  if (!isMatch) {
    return null;
  }

  return user;
};
module.exports = {
  getAllClients,
  postClientDetails,
  getClientById,
  validateUser,
  getClientEmailId,
};
