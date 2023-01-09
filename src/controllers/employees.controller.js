const jwt = require("jsonwebtoken");
const EmployeesService = require("../services/employees.service");
const { Errors } = require("../constants");
const getEmployeeById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const match = await EmployeesService.getEmployeeById(id);
    if (!match) {
      const error = new Error(`Employee with ${id} does not exist`);
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
const getAllAgentEmployees = async (req, res, next) => {
  try {
    const allAgents = await EmployeesService.getAllAgentEmployees();
    res.json(allAgents);
  } catch (error) {
    next(error);
  }
};
const postNewEmployeeDetails = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have for creating new Employee`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const newEmployee = await EmployeesService.postNewEmployeeDetails(req.body);
    const newEmployeeObj = newEmployee.toObject();
    delete newEmployeeObj.password;
    res.status(201).json({
      status: "success",
      data: newEmployeeObj,
    });
  } catch (error) {
    next(error);
  }
};
const postEmployeeLogin = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error(
      `Request body is missing, and needs to have login details`
    );
    error.name = Errors.BadRequest;
    return next(error);
  }
  try {
    const user = await EmployeesService.validateUser(req.body);
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
        id: user._id,
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
  getEmployeeById,
  getAllAgentEmployees,
  postNewEmployeeDetails,
  postEmployeeLogin,
};
