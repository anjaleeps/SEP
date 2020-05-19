const session = require('./session')
const appointment = require('./appointment')
const diagnosis = require('./diagnosis')

module.exports = function (app) {
    app.use('/appointment/:appointmentId/diagnosis', diagnosis)
    app.use('/appointment', appointment)
    app.use('/', session)
} 

