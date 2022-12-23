const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");

const getEmployeeById = (_id) => {
  return Employee.findById(_id);
};
const getAllAgentEmployees = () => {
  const result = Employee.find({ role: "agent" });
  console.log(result);
  return result;
};
const postNewEmployeeDetails = (bodyDetails) => {
  return Employee.create(bodyDetails);
};

module.exports = {
  getEmployeeById,
  getAllAgentEmployees,
  postNewEmployeeDetails,
};
