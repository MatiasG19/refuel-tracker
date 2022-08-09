import Dexie, { Table } from 'dexie'
import {
  Vehicle,
  Refuel,
  FuelUnit,
  GraphData,
  Settings
} from '../scripts/models'

export class RefuelTrackerDexie extends Dexie {
  vehicles!: Table<Vehicle>
  refuels!: Table<Refuel>
  settings!: Table<Settings>

  constructor() {
    super('RefuelTrackerDb')
    this.version(1).stores({
      vehicles: '++id, name, plateNumber, fuelUnitId',
      refuels:
        '++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId',
      settings:
        '++id, colorThemeId, distanceUnitId, vehicleId, plateNumberInTitleActive, refuelFilterActive'
    })
  }
}

export const db = new RefuelTrackerDexie()
