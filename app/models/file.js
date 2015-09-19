// Collector schema.
var mongoose = require('mongoose')

// define the schema for our user model
var FileObject = mongoose.Schema({
  name: {
    original: String,
    system: String
  },
  path: {
    destination: String,
    full: String
  },
  meta: {
    size: Number,
    mimetype: String,
    time: {
      upload: { type: Date, default: Date.now }
    }
  }

})

module.exports = mongoose.model('File', FileObject)
