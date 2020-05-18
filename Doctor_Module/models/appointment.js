const db = require('../db')

function Appointment(){
    
}

Appointment.prototype.findAllBySession = async function (sessionId, date) {
    let query = "select a.session_id, TO_CHAR(date, 'YYYY-MM-DD') as date, a.status, \
        a.patient_number, to_char(a.scheduled_time, 'HH:MI') as scheduled_time, \
        a.patient_id, INITCAP(p.first_name || ' ' || p.last_name) as patient_name  \
        from appointment a inner join patient p on a.patient_id=p.patient_id \
        where a.session_id=$1 and a.date=$2 order by a.patient_number"

    try {
        let result = await db.any(query, [sessionId, date])
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

module.exports = Appointment