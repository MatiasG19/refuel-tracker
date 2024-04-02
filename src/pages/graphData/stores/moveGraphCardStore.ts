import { defineStore } from 'pinia'
import { db } from '../../../boot/dexie'
import { useGraphDataStore } from './graphDataStore'
import { DropResult } from 'vue3-smooth-dnd'

export const useGraphCardStore = defineStore('graphCardStore', () => {
  const store = useGraphDataStore()

  function moveCard(dropResult: DropResult) {
    const { removedIndex, addedIndex } = dropResult
    if (
      removedIndex === null ||
      addedIndex === null ||
      removedIndex === addedIndex
    )
      return

    const movedGraph = store.graphData.filter(
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

    const graphData = store.graphData.filter(
      g => g.sequence >= startIndex && g.sequence <= endIndex
    )

    // Move up
    if (sign > 0) {
      for (let i = endIndex; i >= startIndex; i--) {
        const graph = graphData.filter(g => g.sequence === i)[0]
        graph.sequence += sign
      }
    } else {
      for (let i = startIndex; i <= endIndex; i++) {
        const graph = graphData.filter(g => g.sequence === i)[0]
        graph.sequence += sign
      }
    }
    movedGraph.sequence = addedIndex + 1

    // Save to database
    ;(async () => {
      await db.transaction('rw', [db.graphSettings], async () => {
        for (let j = 0; j < graphData.length; j++) {
          await db.graphSettings.update(graphData[j].id as number, {
            sequence: graphData[j].sequence
          })
        }
        await db.graphSettings.update(movedGraph.id as number, {
          sequence: movedGraph.sequence
        })
      })
    })()
  }

  return {
    moveCard
  }
})
