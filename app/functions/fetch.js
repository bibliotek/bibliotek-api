var PDF = require('../models/pdf')

//
// Fetches all status
// from the database.
//
var FetchAllPDF = function (callback) {
  PDF.find(function (err, data) {
    if (err) {
      var payload = { 'success': false, 'message': 'Could not collect status records from database.'}
      callback(payload)
    } else {
      var out = {
        'success': true,
        'count': null,
        'records': []
      }
      var c = 0
      for (var i = 0; i < data.length; i++) {
        //
        // Cleaning records that
        // don't have id.
        //
        if (typeof data[i].id === typeof undefined) {
          continue
        } else {
          c++
          out.records.push({
            'id': data[i].id,
            'status': data[i].status,
            'message': data[i].message,
            'time': data[i].time
          })
        }
      }

      //
      // Adding count.
      //
      out.count = c
      callback(null, out)
    }
  })
}

//
// Exporting functions.
//
module.exports = {
  FetchAllPDF: FetchAllPDF
}
