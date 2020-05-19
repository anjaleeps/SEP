const Diagnosis = require('../models/diagnosis')
const DiagnosisType = require('../models/diagnosisType')
const Prescription = require('../models/prescription')

exports.sendForm = async function(req, res){
    res.render('diagnosis/new')
}

exports.createNewDiagnosis = async function(req, res){

}