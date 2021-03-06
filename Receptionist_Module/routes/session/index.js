const appointmentController = require('../../controllers/appointmentController')
const express = require('express')
const router = express.Router()

router.get('/', appointmentController.getSessions)
router.get('/:sessionId', appointmentController.getSessionInfo)

module.exports = router