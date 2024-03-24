import fs from 'fs'
import path from 'path'
import process from 'process'

function modifyPackageJson(version) {
  const filePath = path.join(
    process.cwd(),
    'src-capacitor',
    'android',
    'app',
    'build.gradle'
  )
  let file = fs.readFileSync(filePath, 'utf8')
  const versionArr = version.split('.')
  const versionCode = versionArr[0] * 100000 + versionArr[1] * 1000 + versionArr[2]
  file = file
    .replace(/versionCode 1/g, `versionCode ${versionCode}`)
    .replace(/versionName "1.0"/g, `versionName "${version}"`)

  fs.writeFile(filePath, file, err => {
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
