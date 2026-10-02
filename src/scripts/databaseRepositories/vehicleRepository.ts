import { db, type PersistedVehicle } from '@/boot/dexie'
import type { Vehicle } from '../libraries/refuel/models'
import fuelUnitRepository from './fuelUnitRepository'
import refuelRepository from './refuelRepository'
import expenseRepository from './expenseRepository'

async function hydrateVehicle(vehicle: PersistedVehicle): Promise<Vehicle> {
  return {
    ...vehicle,
    fuelUnit: (await fuelUnitRepository.getFuelUnit(vehicle.fuelUnitId))!,
    refuels: await refuelRepository.getRefuels(vehicle.id),
    expenses: await expenseRepository.getExpenses(vehicle.id)
  }
}

async function getVehicle(id: number): Promise<Vehicle | null> {
  const vehicle = await db.vehicles.filter(v => v.id === id).first()
  if (!vehicle) return null
  return hydrateVehicle(vehicle)
}

async function getVehicles(): Promise<Vehicle[]> {
  const vehicles = await db.vehicles.toArray()
  return Promise.all(vehicles.map(hydrateVehicle))
}

async function addVehicle(vehicle: Vehicle): Promise<number> {
  return (await db.vehicles.add({
    name: vehicle.name,
    plateNumber: vehicle.plateNumber,
    currencyUnit: vehicle.currencyUnit,
    fuelUnitId: vehicle.fuelUnitId,
    totalFuelConsumption: '0.00',
    odometer: vehicle.odometer
  } as PersistedVehicle)) as number
}

async function updateVehicle(vehicle: Vehicle) {
  await db.vehicles.update(vehicle.id, {
    name: vehicle.name,
    plateNumber: vehicle.plateNumber,
    currencyUnit: vehicle.currencyUnit,
    fuelUnitId: vehicle.fuelUnitId,
    ...(vehicle.totalFuelConsumption !== undefined
      ? { totalFuelConsumption: vehicle.totalFuelConsumption }
      : {}),
    odometer: vehicle.odometer
  })
}

async function updateTotalFuelConsumption(
  id: number,
  totalFuelConsumption: string
) {
  await db.vehicles.update(id, { totalFuelConsumption })
}

async function deleteVehicle(id: number) {
  await db.transaction(
    'rw',
    [db.vehicles, db.refuels, db.settings],
    async () => {
      const refuels = await db.refuels.where('vehicleId').equals(id).toArray()
      refuels.forEach(r => {
        void (async () => {
          await db.refuels.delete(r.id)
        })()
      })
      await db.vehicles.delete(id)
    }
  )
}

export default {
  getVehicle,
  getVehicles,
  addVehicle,
  updateVehicle,
  updateTotalFuelConsumption,
  deleteVehicle
}
