//
// Tests configuration files.
//
var fs = require('fs')
var chai = require('chai')
var http = require('http')
var should = require('should')
var chaiHttp = require('chai-http')
var expect = require('chai').expect

//
// Configuring Chai to use http.
//
chai.use(chaiHttp)

describe('Application routes.', function () {
  var application = chai.request('http://localhost:3000')

  it('GET [/status] should return 200 status.', function (done) {
    application
      .get('/status')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('GET [/status] to have complete status object.', function (done) {
    application
      .get('/status')
      .end(function (err, res) {
        expect(res.body).to.have.a.property('online')
        expect(res.body).to.have.a.property('message')
        expect(res.body).to.have.a.property('version')
        expect(res.body).to.have.a.property('repository')
        done()
      })
  })

  it('GET [/] should return 200 status.', function (done) {
    application
      .get('/')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        done()
      })
  })

  it('GET [/] should return complete object.', function (done) {
    application
      .get('/')
      .end(function (err, res) {
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('count')
        expect(res.body).to.have.a.property('records')
        done()
      })
  })

  it('GET [/] should return a records array.', function (done) {
    application
      .get('/')
      .end(function (err, res) {
        expect(typeof res.body.records).to.equal(typeof [])
        done()
      })
  })

  it('GET [/] should return false if path is sent with request.', function (done) {
    application
      .get('/')
      .send({ path: 'foo' })
      .end(function (err, res) {
        expect(res.body.success).to.equal(false)
        done()
      })
  })

  it('POST [/] with a complete object should return success.', function (done) {
    application
      .post('/')
      .send({
        owner: 'foo',
        name: 'My PDF paper',
        path: './foo/bar.pdf'
      })
      .end(function (err, res) {
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('POST [/] with a complete object should return a complete message.', function (done) {
    application
      .post('/')
      .send({
        owner: 'foo',
        name: 'My favorite PDF paper.',
        path: './foo/bar.pdf'
      })
      .end(function (err, res) {
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('message')
        expect(res.body).to.have.a.property('record')
        expect(res.body.record).to.have.a.property('_id')
        expect(res.body.record).to.have.a.property('__v')
        expect(res.body.record).to.have.a.property('owner')
        expect(res.body.record).to.have.a.property('bucket')
        expect(res.body.record).to.have.a.property('private')
        expect(res.body.record).to.have.a.property('name')
        expect(res.body.record).to.have.a.property('image')
        expect(res.body.record).to.have.a.property('description')
        expect(res.body.record).to.have.a.property('favorite')
        expect(res.body.record).to.have.a.property('priority')
        expect(res.body.record).to.have.a.property('path')
        expect(res.body.record).to.have.a.property('time')
        expect(res.body.record).to.have.a.property('tags')
        expect(res.body.record).to.have.a.property('notes')
        done()
      })
  })

  // it('POST [/upload] with a file returns a complete object and success', function (done) {
  //   application
  //     .post('/upload')
  //     .attach(fs.readFileSync('./test/data/paper.pdf'), fs.readFileSync('./test/data/paper.pdf'))
  //     .end(function (err, res) {
  //       console.log(res.body)
  //       expect(res.body.success).to.equal(true)
  //       done()
  //     })

  // })

  it('DELETE [/] with a complete object should return success', function (done) {
    application
      .delete('/')
      .send({
        id: 'foo'
      })
      .end(function (err, res) {
        expect(res.body.success).to.equal(true)
        done()
      })
  })

  it('DELETE [/] with a complete object should return a complete message', function (done) {
    application
      .delete('/')
      .send({
        id: 'collector-ny-01'
      })
      .end(function (err, res) {
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('message')
        expect(res.body).to.have.a.property('count')
        expect(res.body).to.have.a.property('log')
        done()
      })
  })

  it('GET [/404] should return a 404 error.', function (done) {
    application
      .get('/404')
      .end(function (err, res) {
        expect(res.status).to.equal(404)
        done()
      })
  })

  it('GET [/404] should return a page not found message.', function (done) {
    application
      .get('/404')
      .end(function (err, res) {
        expect(res.body.success).to.equal(false)
        expect(res.body).to.have.a.property('success')
        expect(res.body).to.have.a.property('message')
        done()
      })
  })

})
