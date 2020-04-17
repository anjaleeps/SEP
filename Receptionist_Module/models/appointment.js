const db = require('../db')

function Appointment() {

}

Appointment.prototype.findOne = async function (session_id, date) {
    let query = "select a.session_id, TO_CHAR(date, 'DD-MM-YYYY') as date, \
        (a.patient_number+1) as available_number, s.start_time, \
        (a.scheduled_time + s.time_per_patient) as appointment_time \
        from appointment a inner join session s on a.session_id=s.session_id \
        where a.session_id=$1 and a.date=$2 order by a.patient_number desc limit 1"

    try {
        let result = await db.oneOrNone(query, [session_id, date])
        console.log(result)
        return result
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

Appointment.prototype.findOneById = async function (appointmentId) {
    let query = "select a.appointment_id, to_char(a.date, 'DD-MM-YYYY') as date, a.patient_number, a.scheduled_time, \
        to_char(s.start_time, 'HH:MI') as start_time, to_char(s.end_time, 'HH:MI') as end_time, \
        INITCAP(d.first_name || ' ' || d.last_name) as doctor_name, p.patient_id, \
        INITCAP(p.first_name || ' ' || p.last_name) as patient_name \
        from appointment a inner join session s on s.session_id=a.session_id \
        inner join doctor d on s.doctor_id=d.doctor_id \
        inner join patient p on p.patient_id= a.patient_id where appointment_id=$1"

    try{
        let result = await db.oneOrNone(query, appointmentId)
        console.log(result)
        return result
    }
    catch(err){
        console.log(err)
        throw err
    }
}

Appointment.prototype.create = async function (appointment) {
    let query = "INSERT INTO appointment (session_id, date, patient_id, patient_number, scheduled_time) \
        VALUES (${appointment.sessionId}, ${appointment.date},  ${appointment.patientId}, \
        ${appointment.patientNumber}, ${appointment.scheduledTime}) RETURNING appointment_id"

    try {
        let result = await db.oneOrNone(query, { appointment: appointment })
        return result
    }
    catch (err) {
        console.log(err)
        throw err
    }
}

module.exports = Appointment