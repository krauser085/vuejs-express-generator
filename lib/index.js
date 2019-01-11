const colors = require('colors')
const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')
const questions = require('questions')
const program = require('commander')

var makeApp = () => {
  program.version('0.1.0')
    .option('-s, --my-sql', 'set MySql on your project')
    .parse(process.argv)

  // destination directory
  let destPath = program.args.shift() || '.'
  destPath = path.resolve(destPath)

  questions.askMany({
    appName: { info: 'App\'s name'.cyan },
    description: { info: 'description'.cyan },
    main: { info: 'main file location'.cyan }
  }, result => {

    let pkg = {
      name: result.appName,
      version: program.version,
      description: result.description,
      main: result.main
    }

    createPackage(destPath, pkg)
  })
}

function createPackage(dest, pkg) {
  mkdir(dest)
  write(path.join(dest, 'package.json'), JSON.stringify(pkg))
}

/**
 * Display warning messages
 * @param {String} msg
 */
function warn (msg) {
  console.warn(`\n\t warning: ${msg} \n`.yellow)
}

/**
 * echo str > file.
 *
 * @param {String} file
 * @param {String} str
 */
function write (file, str) {
  fs.writeFileSync(file, str)
  console.log('\t file\'s created :'.cyan + file)
}

/**
 * Make the given dir
 *
 * @param {string} dir
 */
function mkdir (dir) {
  mkdirp.sync(dir)
  console.log('\t created :'.cyan + dir + path.sep)
}
exports.makeApp = makeApp