//
// Connects to database and runs server.
//
var cors = require('cors')
var morgan = require('morgan')
var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

//
// Loading database variables.
//
var DB = require('./config/database')

//
// Only start the application
// if the database is ready.
//
mongoose.connection.on('connected', function (ref) {
  //
  // Application variables.
  //
  var app = express()
  var port = process.env.PORT || 3000

  //
  // Application configuration.
  //
  app.use(cors())
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  //
  // Routes.
  //
  require('./app/routes.js')(app)

  //
  // Start server.
  //
  app.listen(port)
  console.log('Bibiotek API running on port ' + port)

})

mongoose.connection.on('error', function (err) {
  console.log('Could not connect to MongoDB.')
  throw err
})

//
// Attempt connection with MongoDB.
//
console.log('Attemting connection to: ' + DB.url)
mongoose.connect(DB.url)
