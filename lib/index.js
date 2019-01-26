const colors = require('colors')
const path = require('path')
const fs = require('file-system')
const questions = require('questions')
const program = require('commander')

var makeApp = () => {
  program.version('0.1.0')
    .option('-c, --css [type]', 'Use CSS Pre-processors [sass, scss, less, postcss]', 'css')
    .parse(process.argv)

  // destination directory
  let dest = program.args.shift() || '.'
  dest = path.resolve(dest)

  questions.askMany({
    appName: { info: 'App\'s name'.cyan },
    description: { info: 'description'.cyan },
  }, result => {

    let pkg = {
      "name": result.appName,
      "version": program.version,
      "description": result.description,
      "main": "app.js",
      "private": true,
      "scripts": {
        "frontend": "webpack --config ./node_modules/@vue/cli-service/webpack.config.js --watch",
        "backend": "nodemon app.js",
        "build": "vue-cli-service build",
        "start": "concurrently \"npm run frontend\" \"npm run backend\" "
      },
      "dependencies": {
        "cookie-parser": "~1.4.3",
        "debug": "~2.6.9",
        "express": "~4.16.0",
        "morgan": "~1.9.0",
        "request": "^2.88.0"
      },
      "devDependencies": {
        "@vue/cli-plugin-babel": "^3.2.0",
        "@vue/cli-service": "^3.2.0",
        "@vue/eslint-config-standard": "^4.0.0",
        "babel-eslint": "^10.0.1",
        "concurrently": "^4.1.0",
        "eslint": "^5.8.0",
        "eslint-plugin-vue": "^5.0.0-0",
        "node-sass": "^4.9.0",
        "nodemon": "^1.18.9",
        "sass-loader": "^7.0.1",
        "vue": "^2.5.17",
        "vue-template-compiler": "^2.5.17",
        "webpack-cli": "^3.2.1"
      }
    }

    createPackage(dest, pkg)
  })
}

function createPackage (dest, pkg) {
  mkdir(dest)

  // create package.json
  write(path.join(dest, 'package.json'), JSON.stringify(pkg, null, 2))

  // copy template files to a destination directory
  copyTemplates(dest)
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
 * @param {String} file
 * @param {String} str
 */
function write (file, str) {
  fs.writeFileSync(file, str)
  console.log('\t file\'s created :'.cyan + file)
}

/**
 * Make the given dir
 * @param {string} dir
 */
function mkdir (dir) {
  fs.mkdirSync(dir)
  console.log('\t created :'.cyan + dir + path.sep)
}

/**
 * Copy all template files
 * to the dest directory
 * @param {string} to
 */
function copyTemplates(to) {
  let from = path.resolve(__dirname, 'template-basic')
  fs.copySync(from, to)
}
exports.makeApp = makeApp