import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from 'src/boot/dexie'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useVehicleStore } from 'src/pages/vehicles/stores/vehicleStore'

export const useRefuelStore = defineStore('refuelStore', () => {
  const settings = useSettingsStore()
  const vehicleStore = useVehicleStore()
  const refuels = ref<Refuel[]>([])
  const vehicle = ref<Vehicle | null>(null)

  async function read() {
    if (!settings.selectedVehicleId) return
    refuels.value = await getRefuels(settings.selectedVehicleId)
    vehicle.value = await vehicleStore.getVehicle(settings.selectedVehicleId)
  }

  async function getRefuels(vehicleId: number): Promise<Refuel[]> {
    return await db.refuels.where('vehicleId').equals(vehicleId).toArray()
  }

  async function getRefuel(id: number): Promise<Refuel | null> {
    if (!settings.selectedVehicleId) return null
    const refuels = await getRefuels(settings.selectedVehicleId)
    return refuels.find(v => v.id == id) ?? null
  }

  async function addRefuel(refuel: Refuel): Promise<number> {
    return (await db.refuels.add(refuel)) as number
  }

  async function updateRefuel(refuel: Refuel) {
    await db.refuels.put(refuel)
  }

  async function deleteRefuel(id: number) {
    await db.refuels.delete(id)
  }

  return {
    refuels,
    read,
    getRefuel,
    addRefuel,
    updateRefuel,
    deleteRefuel
  }
})
