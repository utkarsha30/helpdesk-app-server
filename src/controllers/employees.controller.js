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
module.exports = {
  getEmployeeById,
  getAllAgentEmployees,
  postNewEmployeeDetails,
};
