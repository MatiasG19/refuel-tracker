import Dexie, { Table } from 'dexie'
import { Vehicle, Refuel, FuelUnit, GraphData } from '../scripts/models'

export class RefuelTrackerDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  vehicles!: Table<Vehicle>

  constructor() {
    super('RefuelTrackerDb')
    this.version(1).stores({
      vehicles: '++id, name, plateNumber, fuelUnitId' // Primary key and indexed props
    })
  }
}

export const db = new RefuelTrackerDexie()
