import fs from 'fs'
import path from 'path'
import process from 'process'

function modifyPackageJson(version) {
  const filePath = path.resolve(process.cwd(), 'package.json')
  const file = fs.readFileSync(filePath, 'utf8')
  const newFile = JSON.parse(file)
  newFile['version'] = version

  fs.writeFile(filePath, JSON.stringify(newFile, null, 2), err => {
    if (err) {
      throw new Error(err.message)
    }
  })
}

function main() {
  var args = process.argv.slice(2)
  modifyPackageJson(args[0])
}

main()
