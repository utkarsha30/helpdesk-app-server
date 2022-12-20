const {Router} = require('express')
const ClientCtrl = require('../controllers/client.controller')
const router = Router();

router.get('/',ClientCtrl.getClients);
router.get('/:id',ClientCtrl.getClientById);
router.post('/register',ClientCtrl.postClientDetails);
module.exports = router;