const { Router } = require("express");
const CategoriesCtrl = require("../controllers/categories.controller");
const { authenticate, authorize } = require("../middleware/auth");
const router = Router();

router.post(
  "/add",
  authenticate,
  authorize("admin"),
  CategoriesCtrl.postNewCategory
);
router.get(
  "/",
  authenticate,
  authorize("admin", "agent", "client"),
  CategoriesCtrl.getAllCategories
);
router.get(
  "/:id",
  authenticate,
  authorize("admin", "agent"),
  CategoriesCtrl.getCategoryById
);
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  CategoriesCtrl.updateCategory
);
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  CategoriesCtrl.deleteCategory
);

module.exports = router;
