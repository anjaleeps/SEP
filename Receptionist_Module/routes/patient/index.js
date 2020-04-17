const patientController = require('../../controllers/patientController')
const express = require('express')
const router = express.Router()

router.get('/new', (req, res) => {
    res.render('patient/new');
})
router.post('/', patientController.registerPatient)

router.get('/:patientId', patientController.findPatientById)



module.exports = router;
