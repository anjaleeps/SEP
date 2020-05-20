const db = require("../db")

function DiagnosisType(){

}

DiagnosisType.prototype.findAll = function (){
    let query = "SELECT * FROM diagnosis_type order by diagnosis_type"
    try{
        let result = db.any(query)
        console.log(result)
        return result
    }
    catch(err){
        console.log(err)
        throw err
    }
}

module.exports = DiagnosisType 