const express = require('express')
const router=express.Router()
const {log} = require('../../middlewares/logger.middleware')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, addToyMsg, removeToyMsg } = require('./toy.controller')


router.get('/', log, getToys)
router.get('/:id', getToyById)
router.post('/',requireAuth, requireAdmin,addToy)
router.put('/:id', requireAuth,requireAdmin,updateToy)
router.delete('/:id',requireAuth, requireAdmin,removeToy)

router.post('/:id/msg' ,requireAuth,addToyMsg)
router.delete('/:id/msg/:msgId', requireAuth,removeToyMsg)

module.exports = router