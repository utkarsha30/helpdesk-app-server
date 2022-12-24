const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

const getEmployeeById = (_id) => {
  return Employee.findById(_id).populate("tickets");
};
const getAllAgentEmployees = () => {
  return Employee.find({ role: "agent" });
};
const postNewEmployeeDetails = (bodyDetails) => {
  return Employee.create(bodyDetails);
};

module.exports = {
  getEmployeeById,
  getAllAgentEmployees,
  postNewEmployeeDetails,
};
