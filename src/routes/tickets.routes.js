const { Router } = require("express");
const TicketsCtrl = require("../controllers/tickets.controller");
const { authenticate, authorize } = require("../middleware/auth");
const router = Router();

router.get("/", authenticate, authorize("admin"), TicketsCtrl.getAllTickets);
router.get(
  "/count",
  authenticate,
  authorize("admin"),
  TicketsCtrl.getAdminTicketCount
);
router.get("/:id", TicketsCtrl.getTicketById);
router.get(
  "/:id/summary",
  authenticate,
  authorize("client"),
  TicketsCtrl.getClientTicketsSummary
);
router.get(
  "/:id/count",
  authenticate,
  authorize("agent"),
  TicketsCtrl.getAgentTicketCount
);
router.post(
  "/add",
  authenticate,
  authorize("client"),
  TicketsCtrl.postNewTicket
);
// router.patch(
//   "/add/:id/attachments",
//   authenticate,
//   authorize("client"),
//   TicketsCtrl.postAttachments
// );
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
