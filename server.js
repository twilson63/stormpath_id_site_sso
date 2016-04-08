const stormpathUrl = 'https://api.stormpath.com/v1/applications'
const applicationId = '2fDHhdhJUK5PxaAfwF55IO'
const stormpath = require('stormpath')
const path = require('path')
const R = require('ramda')

var apiKey = new stormpath.ApiKey(
  process.env['STORMPATH_CLIENT_APIKEY_ID'],
  process.env['STORMPATH_CLIENT_APIKEY_SECRET']
)
var client = new stormpath.Client({ apiKey: apiKey })

var express = require('express')
var app = express()

// api functions
var getIDUrl = _ => new Promise((resolve, reject) => {
  client.getApplication([stormpathUrl, applicationId].join('/'), (err, app) => {
    if (err) reject(err)
    resolve(app.createIdSiteUrl({callbackUri: 'http://localhost:3000/authorize'}))
  })
})


const handleLogin = (req, res) =>
  getIDUrl().then(url => res.send({ url: url }))

const serveIndex = (req, res) =>
  res.sendFile(path.resolve('./public/index.html'))
  
// app
app.use(express.static('public'))

app.get('/login', handleLogin)
app.all('*', serveIndex)

app.listen(3000)
