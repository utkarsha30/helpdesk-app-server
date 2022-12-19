const {Router} = require('express')
const ClientCtrl = require('../controllers/client.controller')
const router = Router();

router.get('/login',ClientCtrl.getClients);

module.exports = router;