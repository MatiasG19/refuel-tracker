import Dexie, { Table } from 'dexie'
import { Vehicle, Refuel, Period, Settings } from '../scripts/models'

export class RefuelTrackerDexie extends Dexie {
  vehicles!: Table<Vehicle>
  refuels!: Table<Refuel>
  periods!: Table<Period>
  settings!: Table<Settings>

  constructor() {
    super('RefuelTrackerDb')
    this.version(1).stores({
      vehicles: '++id, name, plateNumber, fuelUnitId',
      refuels:
        '++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId',
      periods: '++id, name, periodInDays',
      settings:
        '++id, colorThemeId, distanceUnitId, vehicleId, plateNumberInTitleActive, refuelFilterActive'
    })

    // Create static tables
    this.createPeriods()
    this.createSettings()
  }

  createPeriods() {
    ;(() => {
      const periods: Period[] = [
        { name: 'Week', periodInDays: 7 },
        { name: '3 Months', periodInDays: 90 },
        { name: '6 Months', periodInDays: 180 },
        { name: 'Year', periodInDays: 365 },
        { name: 'Max', periodInDays: 0 }
      ]

      periods.forEach(p => {
        ;(async (p: Period) => {
          const periods = await this.periods
            .where('periodInDays')
            .equals(p.periodInDays)
            .toArray()
          if (periods.length === 0) await this.periods.put(p)
        })(p)
      })
    })()
  }

  createSettings() {
    ;(async () => {
      if ((await this.settings.count()) === 0) {
        const settings = new Settings()
        settings.colorThemeId = 1
        settings.distanceUnitId = 1
        settings.plateNumberInTitleActive = false
        settings.refuelFilterActive = false
        {
          ;(async () => await this.settings.put(settings))()
        }
      }
    })()
  }
}

export const db = new RefuelTrackerDexie()
