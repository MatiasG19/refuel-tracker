import { Dexie, Table } from 'dexie'
import { Vehicle, Refuel, Period, Settings, FuelUnit } from '../scripts/models'

export class RefuelTrackerDexie extends Dexie {
  vehicles!: Table<Vehicle>
  refuels!: Table<Refuel>
  periods!: Table<Period>
  fuelUnits!: Table<FuelUnit>
  settings!: Table<Settings>

  constructor() {
    super('RefuelTrackerDb')
    this.version(1).stores({
      vehicles: '++id, name, plateNumber, fuelUnitId',
      refuels:
        '++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId',
      periods: '++id, name, periodInDays',
      fuelUnits: '++id, uid, distanceUnit, fuelUnit, fuelConsumptionUnit',
      settings:
        '++id, colorThemeId, distanceUnitId, vehicleId, plateNumberInTitleActive, refuelFilterActive'
    })

    // Insert static data
    this.insertPeriods()
    this.insertFuelUnits()
    this.insertSettings()
  }

  insertPeriods() {
    const periods: Period[] = [
      { name: 'Week', periodInDays: 7 },
      { name: '3 Months', periodInDays: 90 },
      { name: '6 Months', periodInDays: 180 },
      { name: 'Year', periodInDays: 365 },
      { name: 'Max', periodInDays: 0 }
    ]

    periods.forEach(p => {
      ;(async () => {
        const periods = await this.periods
          .where('periodInDays')
          .equals(p.periodInDays)
          .toArray()
        if (periods.length === 0) await this.periods.put(p)
      })()
    })
  }

  insertSettings() {
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

  insertFuelUnits() {
    const fuelUnits: FuelUnit[] = [
      {
        uid: '1',
        distanceUnit: 'km',
        fuelUnit: 'Litres',
        fuelConsumptionUnit: 'L/100km',
        conversion: 1.0
      },
      {
        uid: '2',
        distanceUnit: 'Miles',
        fuelUnit: 'Gallons',
        fuelConsumptionUnit: 'MPG US',
        conversion: 1.0
      },
      {
        uid: '3',
        distanceUnit: 'Miles',
        fuelUnit: 'Gallons',
        fuelConsumptionUnit: 'MPG Imperial',
        conversion: 1.0
      },
      {
        uid: '4',
        distanceUnit: 'km',
        fuelUnit: 'kWh',
        fuelConsumptionUnit: 'kWh/100km',
        conversion: 1.0
      },
      {
        uid: '5',
        distanceUnit: 'km',
        fuelUnit: 'Wh',
        fuelConsumptionUnit: 'Wh/km',
        conversion: 1.0
      },
      {
        uid: '6',
        distanceUnit: 'Miles',
        fuelUnit: 'Wh',
        fuelConsumptionUnit: 'Wh/mile',
        conversion: 1.0
      }
    ]

    fuelUnits.forEach(fu => {
      ;(async () => {
        const fuelUnits = await this.fuelUnits
          .where('uid')
          .equals(fu.uid)
          .toArray()
        if (fuelUnits.length === 0) await this.fuelUnits.put(fu)
      })()
    })
  }
}

export const db = new RefuelTrackerDexie()
