import { Dexie, type Table } from 'dexie'
import { Settings } from '../scripts/models'
import {
  Vehicle,
  Refuel,
  Expense,
  RefuelFilter
} from 'src/scripts/libraries/refuel/models'
import {
  Dashboard,
  type DashboardValueSettings
} from 'src/pages/dashboard/scripts/models'

export class RefuelTrackerDexie extends Dexie {
  dashboards!: Table<Dashboard>
  graphSettings!: Table<DashboardValueSettings>
  vehicles!: Table<Vehicle>
  refuels!: Table<Refuel>
  refuelFilters!: Table<RefuelFilter>
  settings!: Table<Settings>
  expenses!: Table<Expense>

  constructor() {
    super('RefuelTrackerDb')
    this.version(7).stores({
      graphSettings: '++id, uid, sequence, periodId, visible, title',
      vehicles:
        '++id, name, plateNumber, fuelUnitId, totalFuelConsumption, odometer',
      refuels:
        '++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId',
      settings:
        '++id, colorThemeId, distanceUnitId, vehicleId, plateNumberInTitleActive, autoBackupActive, autoBackupPath, lastUpdateCheck, languageId',
      dashboards: '++id, vehicleId, sequence, visible',
      expenses: '++id, description, payedAmount, date, vehicleId'
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
    this.version(5).upgrade(async () => {
      await this.insertDashboards()
    })
    this.version(6).upgrade(async () => {
      const settings: DashboardValueSettings[] = [
        { uid: '7', sequence: 7, visible: true },
        { uid: '8', sequence: 8, visible: true },
        { uid: '9', sequence: 9, visible: true },
        { uid: '10', sequence: 10, visible: true }
      ]

      settings.forEach(s => {
        ;(async () => {
          await this.graphSettings.add(s)
        })()
      })
    })

    // Only called on very first database creation
    this.on('populate', () => {
      this.insertDashboardSettings()
      this.insertDemoData()
      this.insertSettings()
      this.insertRefuelFilter()
      this.insertDashboards()
    })
  }

  insertDashboards() {
    ;(async () => {
      ;(await this.vehicles.toArray()).forEach((v, i) => {
        this.dashboards.add({
          vehicleId: v.id,
          sequence: i + 1,
          visible: true
        })
      })
    })()
  }

  insertDashboardSettings() {
    const settings: DashboardValueSettings[] = [
      { uid: '1', sequence: 1, visible: true },
      { uid: '2', sequence: 2, visible: true },
      { uid: '3', sequence: 3, visible: true },
      { uid: '4', sequence: 4, visible: true },
      { uid: '5', sequence: 5, visible: true },
      { uid: '6', sequence: 6, visible: true },
      { uid: '7', sequence: 7, visible: true },
      { uid: '8', sequence: 8, visible: true },
      { uid: '9', sequence: 9, visible: true },
      { uid: '10', sequence: 10, visible: true }
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
