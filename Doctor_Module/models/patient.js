const db = require('../db')

function Patient(){

}

Patient.prototype.findOneById = async function(patientId){
    let query = "select patient_id, INITCAP(first_name || ' ' || last_name) as patient_name, \
        EXTRACT(YEAR from AGE(birth_date)) as age, phone_number, INITCAP(street) as street,\
        INITCAP(city) as city from patient where patient_id=$1"

    try{
        let result = await db.oneOrNone(query, patientId)
        console.log(result)
        return result
    }
    catch(err){
        throw err
    }
}

module.exports = Patient