// Collector schema.
var mongoose = require('mongoose')

// define the schema for our user model
var PDFObject = mongoose.Schema({
  owner: String,
  bucket: String,
  notes: [{
    title: String,
    note: String,
    time: {
      created: String,
      modified: { type: Date, default: Date.now }
    }
  }],
  private: Boolean,
  name: String,
  image: String,
  description: String,
  favorite: Boolean,
  priority: Number,
  path: String,
  tags: [],
  time: {
    created: String,
    modified: { type: Date, default: Date.now }
  }
})

module.exports = mongoose.model('PDF', PDFObject)
