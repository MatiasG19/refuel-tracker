export * from './checkForUpdate'

function replaceComma(value: string) {
  return value.replace(',', '.')
}

function getDateForFileName(): string {
  const d = new Date()
  return `${d.getFullYear()}${
    d.getMonth() + 1
  }${d.getDate()}_${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
}

export { replaceComma, getDateForFileName }
