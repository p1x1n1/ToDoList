const Router = require('express')
const router = new Router();
const userRoutes = require ('./user.router');

router.use('/users', userRoutes);
module.exports = router;