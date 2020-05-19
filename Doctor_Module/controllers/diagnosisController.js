const Diagnosis = require('../models/diagnosis')
const DiagnosisType = require('../models/diagnosisType')
const Prescription = require('../models/prescription')
const Patient = require('../models/patient')
const Appointment = require('../models/appointment')
const Drug = require('../models/drug')

exports.sendForm = async function(req, res){
    let appointmentId = req.body.appointmentId
    console.log(appointmentId)
    let diagnosisType = new DiagnosisType()
    let drug = new Drug()

    try{
        let drugData = await drug.findAll()
        let diagnosisTypeData = await diagnosisType.findAll()
        res.render('diagnosis/new', {
            appointmentId:appointmentId, 
            drugs: drugData,
            diagnosisTypes: diagnosisTypeData
        })
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

exports.createNewDiagnosis = async function(req, res){

}