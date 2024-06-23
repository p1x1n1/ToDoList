const Router = require('express')
const router = new Router();
const userRoutes = require ('./userRoutes/user.router');

router.use('/users', userRoutes);
module.exports = router;