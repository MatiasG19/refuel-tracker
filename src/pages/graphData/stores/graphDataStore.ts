import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GraphDataFactory } from 'src/pages/graphData/scripts/GraphDataFactory'
import { GraphData } from 'src/pages/graphData/scripts/models'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useVehicleStore } from 'src/pages/vehicles/stores'
import { DropResult } from 'vue3-smooth-dnd'
import { getPeriods as returnPeriods } from 'src/scripts/staticData/periods'
import { Period } from 'src/pages/graphData/scripts/models'
import {
  graphSettingsRepository,
  refuelRepository
} from 'src/scripts/databaseRepositories'

export const useGraphDataStore = defineStore('graphDataStore', () => {
  const graphData = ref<GraphData[]>([])

  const settingsStore = useSettingsStore()
  const vehicleStore = useVehicleStore()

  async function getGraphSettings() {
    return await graphSettingsRepository.getGraphSettings()
  }

  async function readGraphData() {
    graphData.value.length = 0

    if (!settingsStore.selectedVehicleId) {
      graphData.value.length = 0
      return
    }

    const vehicle = await vehicleStore.getVehicle(
      settingsStore.selectedVehicleId
    )
    if (vehicle) {
      vehicle.refuels = await refuelRepository.getRefuels(vehicle.id)
      if (vehicle.refuels.length) {
        graphData.value = new GraphDataFactory(vehicle).getAll(
          await getGraphSettings()
        )
        graphData.value = graphData.value.sort(
          (a, b) => a.sequence - b.sequence
        )
      }
    }
  }

  async function getPeriods(): Promise<Period[]> {
    return await Promise.resolve(returnPeriods())
  }

  function moveCard(dropResult: DropResult) {
    const { removedIndex, addedIndex } = dropResult
    if (
      removedIndex === null ||
      addedIndex === null ||
      removedIndex === addedIndex
    )
      return

    const movedGraph = graphData.value.filter(
      g => g.sequence === removedIndex + 1
    )[0]

    // Move down
    let startIndex = removedIndex + 2,
      endIndex = addedIndex + 1,
      sign = -1
    // Move up
    if (addedIndex < removedIndex) {
      startIndex = addedIndex + 1
      endIndex = removedIndex
      sign = 1
    }

    const graphDataValues = graphData.value.filter(
      g => g.sequence >= startIndex && g.sequence <= endIndex
    )

    // Move up
    if (sign > 0) {
      for (let i = endIndex; i >= startIndex; i--) {
        const graph = graphDataValues.filter(g => g.sequence === i)[0]
        graph.sequence += sign
      }
    } else {
      for (let i = startIndex; i <= endIndex; i++) {
        const graph = graphDataValues.filter(g => g.sequence === i)[0]
        graph.sequence += sign
      }
    }
    movedGraph.sequence = addedIndex + 1
    graphData.value = graphData.value.sort((a, b) => a.sequence - b.sequence)
  }

  function saveCardOrder() {
    ;(async () => {
      await graphSettingsRepository.saveCardOrder(graphData.value)
    })()
  }

  return {
    graphData,
    getGraphSettings,
    readGraphData,
    getPeriods,
    moveCard,
    saveCardOrder
  }
})
