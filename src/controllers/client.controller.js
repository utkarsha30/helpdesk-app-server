const ClientService = require("../services/client.service");
const { Errors } = require("../constants");
getAllClients = async (req, res, next) => {
  try {
    const data = await ClientService.getAllClients();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
const getClientById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const match = await ClientService.getClientById(id);
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
postClientDetails = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new Client`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const newClient = await ClientService.postClientDetails(req.body);
    res.status(201).json({
      status: "success",
      data: newClient,
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  getAllClients,
  postClientDetails,
  getClientById,
};
