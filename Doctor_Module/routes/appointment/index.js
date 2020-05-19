const appointmentController = require('../../controllers/appointmentController')
const express = require('express')
const router = express.Router()

router.get('/', appointmentController.getSessionAppointments)
router.get('/:appointmentId', appointmentController.getPatientAppointment)

module.exports = router