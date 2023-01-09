const { Router } = require("express");
const TicketsCtrl = require("../controllers/tickets.controller");
const { authenticate, authorize } = require("../middleware/auth");
const router = Router();

router.get("/", TicketsCtrl.getAllTickets);
router.get("/:id", TicketsCtrl.getTicketById);
router.post(
  "/add",
  authenticate,
  authorize("client"),
  TicketsCtrl.postNewTicket
);
router.patch(
  "/:id",
  authenticate,
  authorize("client", "agent", "admin"),
  TicketsCtrl.updateTicket
);
router.patch(
  "/:id/addcomment",
  authenticate,
  authorize("client", "agent", "admin"),
  TicketsCtrl.postComment
);
router.delete(
  "/:id",
  authenticate,
  authorize("agent", "admin"),
  TicketsCtrl.deleteTicket
);
module.exports = router;
