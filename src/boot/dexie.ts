import Dexie, { Table } from 'dexie'
import { Vehicle, Refuel, FuelUnit, GraphData } from '../scripts/models'

export class RefuelTrackerDexie extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  vehicles!: Table<Vehicle>
  refuels!: Table<Refuel>

  constructor() {
    super('RefuelTrackerDb')
    this.version(1).stores({
      vehicles: '++id, name, plateNumber, fuelUnitId', // Primary key and indexed props
      refuels:
        '++id, date, refuelAmount, payedAmount, distanceDriven, vehicleId'
    })
  }
}

export const db = new RefuelTrackerDexie()
