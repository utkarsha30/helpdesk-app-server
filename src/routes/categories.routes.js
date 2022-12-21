const {Router} = require('express')
const CategoriesCtrl = require('../controllers/categories.controller')
const router = Router();

router.get('/:id',CategoriesCtrl.getCategoryById)
router.post('/add',CategoriesCtrl.postNewCategory);

module.exports = router;