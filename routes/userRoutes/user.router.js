const Router = require('express')
const router = new Router();
const userController = require("../../controllers/user.controller.js");

router.post('/',userController.create);
router.get('/:id',userController.getOne);
router.get('/',userController.getAll);
router.delete('/:id',userController.delete);
router.put('/:id',userController.update);

module.exports = router;