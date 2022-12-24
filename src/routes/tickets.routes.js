const { Router } = require("express");
const TicketsCtrl = require("../controllers/tickets.controller");
const router = Router();

router.get("/", TicketsCtrl.getAllTickets);
router.get("/:id", TicketsCtrl.getTicketById);
router.post("/ticket", TicketsCtrl.postNewTicket);
router.patch("/:id", TicketsCtrl.updateTicket);
router.patch("/:id/comment", TicketsCtrl.postComment);
router.delete("/:id", TicketsCtrl.deleteTicket);
module.exports = router;
