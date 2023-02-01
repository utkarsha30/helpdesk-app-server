const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Employee = mongoose.model("Employee");

const getEmployeeById = (_id) => {
  return Employee.findById(_id).populate("tickets");
};
const getAllAgentEmployees = () => {
  return Employee.aggregate([
    {
      $match: {
        role: "agent",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
      },
    },
  ]);
};
const getAgentEmailId = (id) => {
  const agentId = mongoose.Types.ObjectId(id);
  return Employee.findOne(
    {
      _id: agentId,
    },
    {
      _id: 0,
      email: 1,
      name: 1,
    }
  );
};
const getAdminsEmailId = () => {
  return Employee.findOne(
    {
      role: "admin",
    },
    {
      _id: 0,
      email: 1,
    }
  );
};
const postNewEmployeeDetails = (bodyDetails) => {
  return Employee.create(bodyDetails);
};
const validateUser = async (loginUser) => {
  const user = await Employee.findOne({
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
  getEmployeeById,
  getAllAgentEmployees,
  postNewEmployeeDetails,
  validateUser,
  getAgentEmailId,
  getAdminsEmailId,
};
