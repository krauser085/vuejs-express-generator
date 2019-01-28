const fs = require('file-system')
const path = require('path')
const cons = require('consolidate')

const directory = path.resolve(__dirname, 'template-basic')
const dest = path.resolve('../test')

function renderFiles () {
  fs.recurseSync(directory, async (filepath, relative, filename) => {
    // when it is not a file, then return
    if (!filename) return

    // render vue files
    if (filename.endsWith('.vue')) {
      let rendered = await cons.handlebars(filepath, { style: 'lang=scss' })
      fs.writeFileSync(path.join(dest, relative), rendered)
      return
    }
    // copy files to the destination directory
    fs.copyFileSync(filepath, path.join(dest,relative))
  })
}
renderFiles()
