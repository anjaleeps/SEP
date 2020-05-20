const Patient = require('../models/patient')

exports.findPatientById = function (req, res) {
    let patient = new Patient()
    
    patient.findOneById(req.params.patientId)
        .then(patientData => {
            if (patientData){
                res.render('patient/show', { patient: patientData })
            }
            else{
                res.sendStatus(404)
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
}

exports.findPatientByPhoneNumber = function (req, res) {
    let patient = new Patient()
    patient.findOneByPhone(req.params.phoneNumber)
        .then(patientData => {
            console.log(patientData)
            if (patientData){
                res.redirect(`/patient/${patientData.patient_id}`)
            }
            else{
                res.render('patient/new')
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
}

exports.registerPatient = function (req, res) {
    let patient = new Patient()
    console.log(req.body)
    patientData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        birthDate: req.body.birthDate,
        email: req.body.email,
        houseNumber: req.body.houseNumber,
        street: req.body.street,
        city: req.body.city
    }
    patient.create(patientData)
        .then(patientData => {
            res.json({ patientId: patientData.patient_id })
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(403)
        })
}
