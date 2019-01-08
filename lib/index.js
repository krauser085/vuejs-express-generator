const colors = require('colors')

var makeApp = () => {
  warn('this is testing')
}

/**
 * Display warning messages
 * @param {String} msg
 */
function warn (msg) {
  console.warn(`\n\t warning: ${msg} \n`.yellow)
}

exports.makeApp = makeApp