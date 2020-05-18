const session = require('./session')
const appointment = require('./appointment')

module.exports = function (app) {
    app.use('/appointment', appointment)
    app.use('/', session)
} 

