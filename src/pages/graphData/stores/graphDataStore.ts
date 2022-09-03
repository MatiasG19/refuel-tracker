import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from 'src/boot/dexie'
import { GraphDataFactory } from 'src/pages/graphData/scripts/GraphDataFactory'
import { GraphData } from 'src/pages/graphData/scripts/models'
import { useGraphCardStore } from './moveGraphCardStore'
// import { useSettingsStore } from 'src/stores/refuelStore/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore/refuelStore'

export const useGraphDataStore = defineStore('graphDataStore', () => {
  const graphData = ref<GraphData[]>([])

  const moveGraphCard = useGraphCardStore()
  // const settings = useSettingsStore()
  const refuelStore = useRefuelStore()

  async function getGraphSettings() {
    return await db.graphSettings.toArray()
  }

  async function readGraphData() {
    graphData.value.length = 0
    if (!refuelStore.selectedVehicleId) return

    const vehicle = await refuelStore.getVehicle(refuelStore.selectedVehicleId)
    if (vehicle && vehicle.refuels?.length) {
      graphData.value = new GraphDataFactory(vehicle)
        .getAll(await getGraphSettings())
        .sort((a, b) => a.sequence - b.sequence)
    }
  }

  return {
    graphData,
    moveGraphCard,
    getGraphSettings,
    readGraphData
  }
})
