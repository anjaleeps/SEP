const diagnosisController = require('../../controllers/diagnosisController')
const express = require('express')
const router = express.Router(mergeParams=true)

router.get('/new', diagnosisController.sendForm)
router.get('/:diagnosisId', diagnosisController.showDiagnosis)
router.post('/', diagnosisController.createNewDiagnosis)

module.exports = router