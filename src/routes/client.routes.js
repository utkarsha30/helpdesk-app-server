const { Router } = require("express");
const ClientCtrl = require("../controllers/client.controller");
const { authenticate, authorize } = require("../middleware/auth");
const router = Router();

router.get("/allclients", ClientCtrl.getAllClients);
router.get("/:id", authenticate, authorize("client"), ClientCtrl.getClientById);

router.post("/register", ClientCtrl.postClientDetails);
router.post("/login", ClientCtrl.postClientLogin);
module.exports = router;
