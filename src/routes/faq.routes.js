const {Router} = require('express')
const router = Router();
const FAQCtrl = require('../controllers/faq.controller')

router.get('/',FAQCtrl.getAllFAQS);
router.post('/add',FAQCtrl.postNewFAQ);
module.exports = router;