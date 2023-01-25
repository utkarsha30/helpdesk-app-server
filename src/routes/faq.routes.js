const { Router } = require("express");
const router = Router();
const FAQCtrl = require("../controllers/faq.controller");
const { authenticate, authorize } = require("../middleware/auth");

router.get("/", FAQCtrl.getAllFAQS);
router.post("/add", authenticate, authorize("admin"), FAQCtrl.postNewFAQ);
router.delete("/:id", authenticate, authorize("admin"), FAQCtrl.deleteFAQ);
router.patch("/:id", authenticate, authorize("admin"), FAQCtrl.updateFAQ);
module.exports = router;
