import { defineStore } from 'pinia'
import { db } from '../../boot/dexie'
import { useRefuelStore } from './refuelStore'

export const useMoveGraphCardStore = defineStore('moveGraphCardStore', () => {
  const store = useRefuelStore()

  function moveTop(uid: string) {
    ;(async () => {
      let data = await db.graphSettings.toArray()
      const selected = data.filter(s => s.uid === uid)[0]
      const stateSelected = store.graphData.filter(d => d.uid === uid)[0]
      stateSelected.sequence = 1
      selected.sequence = 1
      data = data
        .filter(s => s.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)
      const stateData = store.graphData
        .filter(d => d.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)

      await db.transaction('rw', [db.graphSettings], async () => {
        const index = selected.sequence
        const length = store.graphData.length

        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        store.graphData.length = 0
        store.graphData.push(stateSelected)

        for (let i = 0; i < length - 1; i++) {
          await db.graphSettings.update(data[i].id as number, {
            sequence: i + index + 1
          })
          stateData[i].sequence = i + index + 1
          store.graphData.push(stateData[i])
        }
      })
    })()
  }

  function moveUp(uid: string) {
    ;(async () => {
      const data = await db.graphSettings.orderBy('sequence').toArray()
      const selected = data.filter(d => d.uid === uid)[0]
      const currentUp = data.filter(
        d => d.sequence === selected.sequence - 1
      )[0]

      if (!currentUp) return Promise.resolve()

      const stateSelected = store.graphData.filter(d => d.uid === uid)[0]
      const stateCurrentUp = store.graphData.filter(
        d => d.sequence === selected.sequence - 1
      )[0]
      const upSequence = currentUp.sequence

      currentUp.sequence = selected.sequence
      selected.sequence = upSequence

      await db.transaction('rw', [db.graphSettings], async () => {
        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        await db.graphSettings.update(currentUp.id as number, {
          sequence: currentUp.sequence
        })

        stateCurrentUp.sequence = currentUp.sequence
        stateSelected.sequence = upSequence

        const length = store.graphData.length
        const stateData = store.graphData.filter(
          d => d.uid !== selected.uid && d.uid !== currentUp.uid
        )
        // Refill array for reactivity
        store.graphData.length = 0
        for (let i = 1; i <= length; i++) {
          if (stateCurrentUp.sequence === i)
            store.graphData.push(stateCurrentUp)
          else if (stateSelected.sequence === i)
            store.graphData.push(stateSelected)
          else store.graphData.push(stateData.filter(d => d.sequence === i)[0])
        }
      })
    })()
  }

  function moveDown(uid: string) {
    ;(async () => {
      const data = await db.graphSettings.orderBy('sequence').toArray()
      const selected = data.filter(d => d.uid === uid)[0]
      const currentDown = data.filter(
        d => d.sequence === selected.sequence + 1
      )[0]

      if (!currentDown) return Promise.resolve()

      const stateSelected = store.graphData.filter(d => d.uid === uid)[0]
      const stateCurrentDown = store.graphData.filter(
        d => d.sequence === selected.sequence + 1
      )[0]
      const downSequence = currentDown.sequence

      currentDown.sequence = selected.sequence
      selected.sequence = downSequence

      await db.transaction('rw', [db.graphSettings], async () => {
        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        await db.graphSettings.update(currentDown.id as number, {
          sequence: currentDown.sequence
        })

        stateCurrentDown.sequence = currentDown.sequence
        stateSelected.sequence = downSequence

        const length = store.graphData.length
        const stateData = store.graphData.filter(
          d => d.uid !== selected.uid && d.uid !== currentDown.uid
        )
        // Refill array for reactivity
        store.graphData.length = 0
        for (let i = 1; i <= length; i++) {
          if (stateCurrentDown.sequence === i)
            store.graphData.push(stateCurrentDown)
          else if (stateSelected.sequence === i)
            store.graphData.push(stateSelected)
          else store.graphData.push(stateData.filter(d => d.sequence === i)[0])
        }
      })
    })()
  }

  function moveBottom(uid: string) {
    ;(async () => {
      let data = await db.graphSettings.toArray()
      const selected = data.filter(s => s.uid === uid)[0]
      const stateSelected = store.graphData.filter(d => d.uid === uid)[0]
      stateSelected.sequence = store.graphData.length
      selected.sequence = stateSelected.sequence
      data = data
        .filter(s => s.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)
      const stateData = store.graphData
        .filter(d => d.uid !== uid)
        .sort((a, b) => a.sequence - b.sequence)

      await db.transaction('rw', [db.graphSettings], async () => {
        const length = selected.sequence

        store.graphData.length = 0
        for (let i = 0; i < length - 1; i++) {
          await db.graphSettings.update(data[i].id as number, {
            sequence: i + 1
          })
          stateData[i].sequence = i + 1
          store.graphData.push(stateData[i])
        }

        await db.graphSettings.update(selected.id as number, {
          sequence: selected.sequence
        })
        store.graphData.push(stateSelected)
      })
    })()
  }

  return {
    moveTop,
    moveUp,
    moveDown,
    moveBottom
  }
})
