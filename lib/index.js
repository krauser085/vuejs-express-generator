const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const file = require('file-system')
const questions = require('questions')
const program = require('commander')
const cssGenerator = require('./template-generator/cssGenerator.js')

var makeApp = () => {
  program.version('0.1.0')
    .option('-c, -css [type]', 'set CSS pre-processors [sass, less]', 'sass')
    .parse(process.argv)

  // destination directory
  let dest = program.args.shift() || '.'
  dest = path.resolve(dest)

  questions.askMany({
    appName: { info: chalk.cyan('App\'s name') },
    description: { info: chalk.cyan('description') },
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

    if (program.css === 'sass') {
      pkg.devDependencies['node-sass'] = '^4.9.0'
      pkg.devDependencies['sass-loader'] = '^7.0.1'
    }
    createPackage(dest, pkg)
  })
}

function createPackage (dest, pkg) {
  mkdir(dest)

  // create package.json
  write(path.join(dest, 'package.json'), JSON.stringify(pkg, null, 2))

  // copy basic template files to a destination directory
  copyTemplates(dest)

  runTemplateGenerator(dest)
}

/**
 * Display warning messages
 * @param {String} msg
 */
function warn (msg) {
  console.warn(chalk.yellow(`\n\t warning: ${msg} \n`))
}

/**
 * echo str > file.
 * @param {String} file
 * @param {String} str
 */
function write (file, str) {
  fs.writeFileSync(file, str)
  console.log(chalk.cyan('\t file\'s created :') + file)
}

/**
 * Make the given dir
 * @param {string} dir
 */
function mkdir (dir) {
  file.mkdirSync(dir)
  console.log(chalk.cyan('\t created :') + dir + path.sep)
}

/**
 * Copy all template files
 * to the dest directory
 * @param {string} to
 */
function copyTemplates(to) {
  let from = path.resolve(__dirname, 'template-basic')
  file.copySync(from, to)
}

function runTemplateGenerator(to) {
  console.log('runTemplateGenerator()', to + '\\src\\*.vue')
  let files = fs.readFileSync(to + '\\src')
    .filter(fn => fn.endsWith('.vue'))
  console.log('runTemplateGenerator() files', files)
}
exports.makeApp = makeApp