import { Refuel } from 'src/scripts/libraries/refuel/models'
import { Group } from '.'

export interface GroupedRefuels {
  [key: string]: Refuel[]
}

export function groupBy(refuels: Refuel[], groupBy: Group): GroupedRefuels {
  switch (groupBy) {
    case Group.Month:
      return groupByNoGrouping(refuels)
    case Group.Month:
      return groupByMonth(refuels)
    case Group.Year:
      return groupByYear(refuels)
    default:
      throw new Error('Group does not exist!')
  }
}

function groupByNoGrouping(refuels: Refuel[]): GroupedRefuels {
  return refuels.reduce((acc: GroupedRefuels, refuel) => {
    const key = 'key'
    if (!acc[key]) acc[key] = []
    acc[key].push(refuel)
    return acc
  }, {})
}

function groupByMonth(refuels: Refuel[]): GroupedRefuels {
  return refuels.reduce((acc: GroupedRefuels, refuel) => {
    const year = refuel.date.getFullYear()
    const month = refuel.date.getMonth() + 1 // getMonth() returns 0-based month
    const key = `${year}-${month.toString().padStart(2, '0')}`

    if (!acc[key]) acc[key] = []

    acc[key].push(refuel)

    return acc
  }, {})
}

function groupByYear(refuels: Refuel[]): GroupedRefuels {
  return refuels.reduce((acc: GroupedRefuels, refuel) => {
    const year = refuel.date.getFullYear()
    const key = year.toString()

    if (!acc[key]) acc[key] = []

    acc[key].push(refuel)

    return acc
  }, {})
}
