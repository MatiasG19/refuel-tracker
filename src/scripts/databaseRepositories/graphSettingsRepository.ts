import { db } from 'src/boot/dexie'
import type { GraphData } from 'src/pages/graphData/scripts/models'

async function getGraphSettings() {
  return await db.graphSettings.toArray()
}

async function saveCardOrder(graphData: GraphData[]) {
  await db.transaction('rw', [db.graphSettings], async () => {
    for (let j = 0; j < graphData.length; j++) {
      await db.graphSettings.update(graphData[j].id as number, {
        sequence: graphData[j].sequence
      })
    }
  })
}

export default { getGraphSettings, saveCardOrder }
