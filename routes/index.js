const { Router } = require('express');
const router = Router();
const sessionRouter = require('./sessionRouter.js')

router.use('/', sessionRouter)

module.exports = router;