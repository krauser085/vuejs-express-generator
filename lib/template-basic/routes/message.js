var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  let msg = { msg: "Welcome to Vue.js App!" }
  res.json(msg).end()
})

module.exports = router
