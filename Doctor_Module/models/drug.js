const db = require("../db")

function Drug(){

}

Drug.prototype.findAll = function (){
    let query = "SELECT * FROM drug"
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

module.exports = Drug