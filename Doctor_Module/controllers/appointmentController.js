const Session = require('../models/session')
const Appointment = require('../models/appointment')

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
