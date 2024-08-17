export function updateDateFrom(date: string): Date {
  const d = new Date(date)
  d.setHours(0)
  d.setMinutes(0)
  d.setSeconds(0)
  d.setMilliseconds(0)
  return d
}

export function updateDateUntil(date: string): Date {
  const d = new Date(date)
  d.setHours(23)
  d.setMinutes(59)
  d.setSeconds(59)
  d.setMilliseconds(999)
  return d
}
