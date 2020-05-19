const db = require('../db')

function Diagnosis() {

}

Diagnosis.prototype.findAllByPatient = async function (patientId) {
    let query = "select d.diagnosis_id, d.special_note, \
                dit.diagnosis_type, TO_CHAR(a.date, 'YYYY-MM-DD') as date, \
                INITCAP(dc.first_name || ' ' || dc.last_name) as doctor_name, dt.doctor_type from diagnosis d \
                inner join appointment a on a.appointment_id=d.appointment_id \
                inner join session s on s.session_id=a.session_id \
                inner join doctor dc on dc.doctor_id=s.doctor_id \
                inner join doctor_type dt on dt.doctor_type_id=dc.doctor_type_id \
                inner join diagnosis_type dit on dit.diagnosis_type_id=d.diagnosis_type_id \
                where a.patient_id=1 order by a.date desc"

    try{
        result = await db.any(query, patientId)
        console.log(result)
        return result
    }
    catch(err){
        throw err
    }
}

Diagnosis.prototype.create = async function(diagnosis){
    let query = "insert into diagnosis (diagnosis_type_id, appointment_id, special_note) values \
                "
}

module.exports = Diagnosis