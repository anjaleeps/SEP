const diagnosisController = require('../../controllers/diagnosisController')
const express = require('express')
const router = express.Router()

router.get('/new', diagnosisController.sendForm)
router.post('/', diagnosisController.createNewDiagnosis)

module.exports = router