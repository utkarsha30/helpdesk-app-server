const { Router } = require("express");
const ClientCtrl = require("../controllers/client.controller");
const router = Router();

router.get("/", ClientCtrl.getAllClients);
router.get("/:id", ClientCtrl.getClientById);
router.post("/register", ClientCtrl.postClientDetails);
module.exports = router;
