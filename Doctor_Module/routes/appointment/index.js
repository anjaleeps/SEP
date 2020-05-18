const appointmentController = require('../../controllers/appointmentController')
const express = require('express')
const router = express.Router()

router.get('/', appointmentController.getSessionAppointments)

module.exports = router