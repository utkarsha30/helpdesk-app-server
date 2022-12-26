const { Router } = require("express");
const router = Router();
const FAQCtrl = require("../controllers/faq.controller");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/", FAQCtrl.getAllFAQS);
router.post("/add", authenticate, authorize("admin"), FAQCtrl.postNewFAQ);
module.exports = router;
