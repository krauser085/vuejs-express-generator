var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  let testUser = { id: 'testUser01', name: 'Test User' }
  res.json(testUser).end()
})

module.exports = router
