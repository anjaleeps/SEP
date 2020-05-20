const db = require('../db')

function Patient() { }

Patient.prototype.findOneByPhone = async function (phoneNumber) {
    var query = "SELECT patient_id FROM patient where phone_number = $1"
    try {
        let result = await db.oneOrNone(query, [phoneNumber])
        return result
    }
    catch (err) {
        throw err
    }
}

Patient.prototype.findOneById = async function (patientId) {
    var query = "SELECT patient_id, INITCAP(first_name || ' ' || last_name) AS  patient_name, \
     phone_number, email, extract(year from age(birth_date)) as age, house_number, INITCAP(street) AS street,\
     INITCAP(city) AS city FROM patient where patient_id = $1"
    try {
        let result = await db.oneOrNone(query, [patientId])
        console.log(result)
        return result
    }
    catch (err) {
        throw err
    }
}

Patient.prototype.create = async function (patient) {
    var query = "INSERT INTO patient(first_name, last_name, phone_number, birth_date, email, house_number, street, city)\
     VALUES (${patient.firstName}, ${patient.lastName}, ${patient.phoneNumber}, ${patient.birthDate}, ${patient.email},\
     ${patient.houseNumber}, ${patient.street}, ${patient.city}) RETURNING patient_id"

    try {
        let patientData = await db.one(query, { patient: patient })
        return patientData
    }
    catch (err) {
        throw err
    }
}

module.exports = Patient