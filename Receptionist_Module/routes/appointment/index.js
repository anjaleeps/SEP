const appointmentController = require('../../controllers/appointmentController')
const express = require('express')
const router = express.Router()

router.post('/', appointmentController.createAppointment)
router.get('/new', appointmentController.sendForm)
router.get('/:appointmentId', appointmentController.getAppointment)

module.exports = router