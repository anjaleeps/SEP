const Session = require('../models/session')
const Appointment = require('../models/appointment')
const Diagnosis = require('../models/diagnosis')
const Patient = require('../models/patient')

exports.getSessionAppointments = async function (req, res) {
    let sessionId = req.query.sessionId
    let date = req.query.date
    let session = new Session()
    let appointment = new Appointment()

    try {
        let sessionData = await session.findOneById(sessionId)
        if (sessionData) {
            sessionData.date=date
            let appointmentData = await appointment.findAllBySession(sessionId, date)

            res.render('appointment/list', { session: sessionData, appointments: appointmentData })
        }
        else{
            res.sendStatus(404)
        }

    }
    catch (err) {
        res.sendStatus(500)
    }
}

exports.getPatientAppointment = async function(req, res){
    let appointmentId = req.params.appointmentId
    let appointment = new Appointment()
    let diagnosis = new Diagnosis()
    let patient = new Patient()

    try{
        let appointmentData = await appointment.findOneById(appointmentId)
        if (appointmentId){
            let patientId = appointmentData.patient_id
            let patientData = await patient.findOneById(patientId)
            let diagnosisData = await diagnosis.findAllByPatient(patientId)

            res.render('appointment/show', {
                appointment:appointmentData, 
                patient: patientData,
                diagnoses: diagnosisData    
            })
        }
        else{
            res.sendStatus(400)
        }
    }
    catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}
