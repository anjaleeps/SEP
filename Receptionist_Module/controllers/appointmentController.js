const Appointment = require('../models/appointment')
const Patient = require('../models/patient')
const Session = require('../models/session')
const DoctorType = require('../models/doctorType')

exports.createAppointment = async function (req, res) {
    let appointment = new Appointment()
    let appointmentData = req.body.appointment
    try {
        let sessionData = await appointment.findOne(appointmentData.sessionId, appointmentData.date)
        if (sessionData) {
            appointmentData.patientNumber = sessionData.available_number
            appointmentData.scheduledTime = sessionData.appointment_time
        }
        else {
            let session = new Session()
            appointmentData.patientNumber = 1
            let data = await session.findOneById(appointmentData.sessionId)
            appointmentData.scheduledTime = data.start_time
        }

        let result = await appointment.create(appointmentData)
        console.log(result)
        res.json({ appointmentId: result.appointment_id })
    }
    catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

exports.sendForm = async function (req, res) {
    let patient = new Patient()
    let doctorType = new DoctorType()
    let patientId = req.query.patientId
    if (patientId) {
        let patientData = await patient.findOneById(patientId)

        try {
            if (patientData) {
                let doctorTypes = await doctorType.findAll()
                res.render('appointment/new', { patient: patientData, doctorTypes: doctorTypes })
            }
            else {
                res.render('patient/show', { patient: null })
            }
        }
        catch (err) {
            res.sendStatus(500)
        }
    }
    else {
        res.redirect('/')
    }
}

exports.getSessions = function (req, res) {
    let session = new Session()
    let doctorId = req.query.doctorId
    session.findAllByDoctor(doctorId)
        .then(sessionData => {
            res.json({ sessions: sessionData })
        })
        .catch(err => {
            res.sendStatus(500)
        })
}

exports.getSessionInfo = function (req, res) {
    let appointment = new Appointment()
    let sessionId = req.params.sessionId
    let date = req.query.date
    appointment.findOne(sessionId, date)
        .then(appointmentData => {
            res.json({ appointment: appointmentData })
        })
        .catch(err => {
            res.sendStatus(500)
        })
}

exports.getAppointment = function (req, res){
     let appointment = new Appointment()
     let appointmentId = req.params.appointmentId

     appointment.findOneById(appointmentId)
        .then(appointmentData => {
            if (appointmentData){
                if (appointmentData){
                    res.render('appointment/show', {appointment: appointmentData})
                }
                else{
                    res.sendStatus(404)
                }
            }
            else{
                res.sendStatus(404)
            }
        })
        .catch(err => {
            res.sendStatus(500)
        })
}