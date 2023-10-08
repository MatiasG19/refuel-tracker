import { defineStore } from 'pinia'
import { db } from 'src/boot/dexie'
import { ref } from 'vue'
import { date } from 'quasar'

export const useRefuelFilterStore = defineStore('refuelFilterStore', () => {
  const filterActive = ref<boolean>(false)
  const dateFrom = ref<Date>(new Date())
  const dateUntil = ref<Date>(new Date())

  function setFilter() {
    ;(async () => {
      const refuelFilters = await db.refuelFilters.toArray()
      refuelFilters[0].name =
        date.formatDate(dateFrom.value, 'YYYY/MM/DD') +
        ' - ' +
        date.formatDate(dateUntil.value, 'YYYY/MM/DD')
      refuelFilters[0].active = true
      refuelFilters[0].dateFrom = dateFrom.value
      refuelFilters[0].dateUntil = dateUntil.value
      await db.refuelFilters.put(refuelFilters[0])
      filterActive.value = true
    })()
  }

  function removeFilter() {
    ;(async () => {
      const refuelFilters = await db.refuelFilters.toArray()
      refuelFilters[0].active = false
      await db.refuelFilters.put(refuelFilters[0])
      filterActive.value = false
    })()
  }

  return {
    filterActive,
    dateFrom,
    dateUntil,
    setFilter,
    removeFilter
  }
})
