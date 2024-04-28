import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db } from 'src/boot/dexie'
import { GraphDataFactory } from 'src/pages/graphData/scripts/GraphDataFactory'
import { GraphData } from 'src/pages/graphData/scripts/models'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore'
import { DropResult } from 'vue3-smooth-dnd'

export const useGraphDataStore = defineStore('graphDataStore', () => {
  const graphData = ref<GraphData[]>([])

  const settings = useSettingsStore()
  const refuelStore = useRefuelStore()

  async function getGraphSettings() {
    return await db.graphSettings.toArray()
  }

  async function readGraphData() {
    if (!settings.selectedVehicleId) {
      graphData.value.length = 0
      return
    }

    const vehicle = await refuelStore.getVehicle(settings.selectedVehicleId)
    if (vehicle && vehicle.refuels?.length) {
      graphData.value = new GraphDataFactory(vehicle).getAll(
        await getGraphSettings()
      )
      graphData.value = graphData.value.sort((a, b) => a.sequence - b.sequence)
    } else {
      graphData.value.length = 0
    }
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
      await db.transaction('rw', [db.graphSettings], async () => {
        for (let j = 0; j < graphData.value.length; j++) {
          await db.graphSettings.update(graphData.value[j].id as number, {
            sequence: graphData.value[j].sequence
          })
        }
      })
    })()
  }

  return {
    graphData,
    getGraphSettings,
    readGraphData,
    moveCard,
    saveCardOrder
  }
})
