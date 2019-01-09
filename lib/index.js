const colors = require('colors')
const questions = require('questions')

var makeApp = () => {
  warn('this is testing')

  questions.askMany({
    appName: { info: 'App\'s name'.cyan }
  }, result => {
    console.log(result)
  })
}

/**
 * Display warning messages
 * @param {String} msg
 */
function warn (msg) {
  console.warn(`\n\t warning: ${msg} \n`.yellow)
}

exports.makeApp = makeApp