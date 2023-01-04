const jwt = require("jsonwebtoken");
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
    res.json(match);
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
    const newClientObj = newClient.toObject();
    delete newClientObj.password;
    res.status(201).json({
      status: "success",
      data: newClientObj,
    });
  } catch (error) {
    return next(error);
  }
};
const postClientLogin = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have login details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const user = await ClientService.validateUser(req.body);
    if (!user) {
      const error = new Error(`Invalid Credentials`);
      error.name = Errors.Unauthorized;
      return next(error);
    }
    //generate JWT
    const claims = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    jwt.sign(claims, process.env.JWT_SECRET, (err, token) => {
      if (err) {
        err.name = Errors.InternalServerError;
        return next(err);
      }

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      });
    });
  } catch (error) {
    const err = new Error("Something went wrong during login");
    err.name = Errors.InternalServerError;
    return next(err);
  }
};
module.exports = {
  getAllClients,
  postClientDetails,
  getClientById,
  postClientLogin,
};
