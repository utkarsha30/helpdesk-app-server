const { Router } = require("express");
const EmployeesCtrl = require("../controllers/employees.controller");
const router = Router();

router.get("/agents", EmployeesCtrl.getAllAgentEmployees);
router.get("/:id", EmployeesCtrl.getEmployeeById);
router.post("/register", EmployeesCtrl.postNewEmployeeDetails);
module.exports = router;
