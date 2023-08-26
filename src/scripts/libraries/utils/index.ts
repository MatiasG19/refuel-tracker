export * from './checkForUpdate'

function replaceComma(value: string) {
  return value.replace(',', '.')
}

function getDateForFileName(): string {
  const d = new Date()
  return `${d.getFullYear()}${convertToTwoDigitDate(
    d.getMonth() + 1
  )}${convertToTwoDigitDate(d.getDate())}_${convertToTwoDigitDate(
    d.getHours()
  )}${convertToTwoDigitDate(d.getMinutes())}${convertToTwoDigitDate(
    d.getSeconds()
  )}`
}

function convertToTwoDigitDate(date: number): string {
  return date.toString().length == 1 ? `0${date.toString()}` : date.toString()
}

export { replaceComma, getDateForFileName }
