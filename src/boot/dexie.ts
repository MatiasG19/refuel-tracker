import { Dexie, Table } from 'dexie'

import { Vehicle, Refuel, Settings, GraphSettings } from '../scripts/models'

export class RefuelTrackerDexie extends Dexie {
  graphSettings!: Table<GraphSettings>
  vehicles!: Table<Vehicle>
  refuels!: Table<Refuel>
  settings!: Table<Settings>

  constructor() {
    super('RefuelTrackerDb')
    this.version(1).stores({
      graphSettings: '++id, uid, sequence, periodId, visible',
      vehicles: '++id, name, plateNumber, fuelUnitId',
      refuels:
        '++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId',
      settings:
        '++id, colorThemeId, distanceUnitId, vehicleId, plateNumberInTitleActive, refuelFilterActive'
    })

    // Insert static data
    this.insertGraphSettings()
    this.insertSettings()
  }

  insertGraphSettings() {
    const settings: GraphSettings[] = [
      { uid: '1', sequence: 1, visible: true },
      { uid: '2', sequence: 2, visible: true },
      { uid: '3', sequence: 3, visible: true },
      { uid: '4', sequence: 4, visible: true },
      { uid: '5', sequence: 5, visible: true },
      { uid: '6', sequence: 6, visible: true }
    ]

    settings.forEach(s => {
      ;(async () => {
        const settings = await this.graphSettings
          .where('uid')
          .equals(s.uid)
          .toArray()
        if (settings.length === 0) await this.graphSettings.put(s)
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
}

export const db = new RefuelTrackerDexie()
