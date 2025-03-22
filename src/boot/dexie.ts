import { Dexie, type Table } from 'dexie'
import { Settings } from '../scripts/models'
import { Vehicle, Refuel } from 'src/scripts/libraries/refuel/models'
import { type DashboardSettings } from 'src/pages/dashboard/scripts/models'
import { RefuelFilter } from 'src/pages/refuels/models'

export class RefuelTrackerDexie extends Dexie {
  graphSettings!: Table<DashboardSettings>
  vehicles!: Table<Vehicle>
  refuels!: Table<Refuel>
  refuelFilters!: Table<RefuelFilter>
  settings!: Table<Settings>

  constructor() {
    super('RefuelTrackerDb')
    this.version(4).stores({
      graphSettings: '++id, uid, sequence, periodId, visible',
      vehicles: '++id, name, plateNumber, fuelUnitId, totalFuelConsumption',
      refuels:
        '++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId',
      settings:
        '++id, colorThemeId, distanceUnitId, vehicleId, plateNumberInTitleActive, autoBackupActive, autoBackupPath, lastUpdateCheck, languageId'
    })
    this.version(2)
      .stores({
        refuelFilters: '++id, name, active, dateFrom, dateUntil, title'
      })
      .upgrade(tx => {
        this.insertRefuelFilter()
        return tx
          .table('settings')
          .toCollection()
          .modify(setting => {
            delete setting.refuelFilterActive
          })
      })

    // Only called on very first database creation
    this.on('populate', () => {
      this.insertDashboardSettings()
      this.insertDemoData()
      this.insertSettings()
      this.insertRefuelFilter()
    })
  }

  insertDashboardSettings() {
    const settings: DashboardSettings[] = [
      { uid: '1', sequence: 1, visible: true },
      { uid: '2', sequence: 2, visible: true },
      { uid: '3', sequence: 3, visible: true },
      { uid: '4', sequence: 4, visible: true },
      { uid: '5', sequence: 5, visible: true },
      { uid: '6', sequence: 6, visible: true }
    ]

    settings.forEach(s => {
      ;(async () => {
        await this.graphSettings.put(s)
      })()
    })
  }

  insertDemoData() {
    const vehicle = new Vehicle()
    vehicle.name = 'My Vehicle'
    vehicle.plateNumber = 'MYNUMBERPLATE'
    vehicle.currencyUnit = '€'
    vehicle.fuelUnitId = 1
    ;(async () => {
      vehicle.id = (await this.vehicles.put(vehicle)) as number
      const refuels = []
      let refuel = new Refuel()
      refuel.date = new Date()
      refuel.refueledAmount = 33
      refuel.payedAmount = 55
      refuel.distanceDriven = 650
      refuel.vehicleId = vehicle.id
      refuels.push(refuel)

      refuel = new Refuel()
      refuel.date = new Date()
      refuel.refueledAmount = 44
      refuel.payedAmount = 80
      refuel.distanceDriven = 900
      refuel.vehicleId = vehicle.id
      refuels.push(refuel)

      refuel = new Refuel()
      refuel.date = new Date()
      refuel.refueledAmount = 50
      refuel.payedAmount = 90
      refuel.distanceDriven = 850
      refuel.vehicleId = vehicle.id
      refuels.push(refuel)
      await this.refuels.bulkPut(refuels)
    })()
  }

  insertSettings() {
    const settings = new Settings()
    settings.vehicleId = 1
    settings.colorThemeId = 1
    settings.distanceUnitId = 1
    settings.plateNumberInTitleActive = false
    settings.autoBackupActive = false
    settings.autoBackupPath = ''
    const date = new Date()
    settings.lastUpdateCheck = new Date(date.setDate(date.getDate() - 365))
    ;(async () => await this.settings.put(settings))()
  }

  insertRefuelFilter() {
    const refuelFilter = new RefuelFilter()
    refuelFilter.name = ''
    refuelFilter.active = false
    refuelFilter.dateFrom = new Date()
    refuelFilter.dateUntil = new Date()
    ;(async () => await this.refuelFilters.put(refuelFilter))()
  }
}

export const db = new RefuelTrackerDexie()
