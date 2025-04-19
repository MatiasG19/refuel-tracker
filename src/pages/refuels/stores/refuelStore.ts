import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import {
  type Vehicle,
  type Refuel,
  Expense
} from 'src/scripts/libraries/refuel/models'
import {
  refuelRepository,
  vehicleRepository
} from 'src/scripts/databaseRepositories'
import {
  refuelAddedEvent,
  refuelDeletedEvent,
  refuelUpdatedEvent
} from 'src/scripts/events'
import { ExpenseViewModel, VehicleViewModel } from '../models'
import expenseRepository from 'src/scripts/databaseRepositories/expenseRepository'

export const useRefuelStore = defineStore('refuelStore', () => {
  const vehicle = ref<VehicleViewModel | null>(null)

  async function readData(vehicleId?: number) {
    let v: Vehicle | null = null
    if (vehicleId) v = await vehicleRepository.getVehicle(vehicleId)
    else if (vehicle.value) return
    else {
      const vehicles = await vehicleRepository.getVehicles()
      if (vehicles.length > 0) v = vehicles[0] ?? null
    }
    if (!v) return
    vehicle.value = {
      id: v.id,
      name: v.name,
      plateNumber: v.plateNumber,
      currencyUnit: v.currencyUnit,
      fuelUnitId: v.fuelUnitId,
      fuelUnit: v.fuelUnit!,
      totalFuelConsumption: v.totalFuelConsumption ?? '',
      allExpenses: [
        ...v.expenses!.map(e => {
          return { type: 'expense', value: e } as ExpenseViewModel
        }),
        ...v.refuels!.map(r => {
          return { type: 'refuel', value: r } as ExpenseViewModel
        })
      ]
    }
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    const r = vehicle.value!.refuels?.find(r => r.id === id)
    if (!r) return await refuelRepository.getRefuel(id)
    return Promise.resolve(r)
  }

  async function addRefuel(refuel: Refuel) {
    refuel.id = await refuelRepository.addRefuel(toRaw(refuel))
    await refuelAddedEvent(refuel.vehicleId)
  }

  async function updateRefuel(refuel: Refuel) {
    await refuelRepository.updateRefuel(toRaw(refuel))
    await refuelUpdatedEvent(refuel.vehicleId)
  }

  async function deleteRefuel(id: number) {
    const refuel = await refuelRepository.getRefuel(id)
    await refuelRepository.deleteRefuel(id)
    if (refuel) await refuelDeletedEvent(refuel.vehicleId)
  }

  async function getExpense(id: number): Promise<Expense | null> {
    const r = vehicle.value!.expenses?.find(r => r.id === id)
    if (!r) return await expenseRepository.getExpense(id)
    return Promise.resolve(r)
  }

  async function addExpense(expense: Expense) {
    expense.id = await expenseRepository.addExpense(toRaw(expense))
    await refuelAddedEvent(expense.vehicleId)
  }

  async function updateExpense(expense: Expense) {
    await expenseRepository.updateExpense(toRaw(expense))
    await refuelUpdatedEvent(expense.vehicleId)
  }

  async function deleteExpense(id: number) {
    const refuel = await expenseRepository.getExpense(id)
    await expenseRepository.deleteExpense(id)
    if (refuel) await refuelDeletedEvent(refuel.vehicleId)
  }

  return {
    vehicle,
    readData,
    getRefuel,
    addRefuel,
    updateRefuel,
    deleteRefuel,
    getExpense,
    addExpense,
    updateExpense,
    deleteExpense
  }
})
