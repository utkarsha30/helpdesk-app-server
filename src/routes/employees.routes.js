const { Router } = require("express");
const EmployeesCtrl = require("../controllers/employees.controller");
const { authenticate, authorize } = require("../middleware/auth");
const router = Router();

router.get(
  "/agents",
  authenticate,
  authorize("admin"),
  EmployeesCtrl.getAllAgentEmployees
);
router.get("/:id", EmployeesCtrl.getEmployeeById);
router.post("/register", EmployeesCtrl.postNewEmployeeDetails);
router.post("/login", EmployeesCtrl.postEmployeeLogin);
module.exports = router;
