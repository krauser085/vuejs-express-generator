const colors = require('colors')
const questions = require('questions')
const program = require('commander')

var makeApp = () => {
  program.version('0.1.0')
    .option('-s, --my-sql', 'set MySql on your project')
    .parse(process.argv)

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