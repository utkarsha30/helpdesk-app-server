const {Router} = require('express')
const TicketsCtrl = require('../controllers/tickets.controller')
const router = Router();

router.get('/',TicketsCtrl.getAllTickets);
router.post('/ticket',TicketsCtrl.postNewTicket);
module.exports = router;