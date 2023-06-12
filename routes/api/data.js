const express = require('express')
const router = express.Router()
dataCtrl = require('../../controllers/api/data')

module.exports = router

router.use(require('../../config/auth'));
router.post('/retrieve', dataCtrl.retrieve)
router.get('/getStocks', dataCtrl.getStocks)