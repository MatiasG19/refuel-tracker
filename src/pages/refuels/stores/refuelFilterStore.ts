import { defineStore } from 'pinia'
import { db } from 'src/boot/dexie'
import { ref } from 'vue'
import { date } from 'quasar'

export const useRefuelFilterStore = defineStore('refuelFilterStore', () => {
  const filterName = ref<string>('')
  const filterActive = ref<boolean>(false)
  const dateFrom = ref<Date>(new Date())
  const dateUntil = ref<Date>(new Date())

  function setFilter() {
    ;(async () => {
      const refuelFilters = await db.refuelFilters.toArray()
      refuelFilters[0].name = filterName.value =
        date.formatDate(dateFrom.value, 'YYYY/MM/DD') +
        ' - ' +
        date.formatDate(dateUntil.value, 'YYYY/MM/DD')
      refuelFilters[0].active = filterActive.value = true
      refuelFilters[0].dateFrom = dateFrom.value
      refuelFilters[0].dateUntil = dateUntil.value
      await db.refuelFilters.put(refuelFilters[0])
    })()
  }

  function removeFilter() {
    ;(async () => {
      const refuelFilters = await db.refuelFilters.toArray()
      refuelFilters[0].active = filterActive.value = false
      await db.refuelFilters.put(refuelFilters[0])
    })()
  }

  function readFilter() {
    ;(async () => {
      const refuelFilters = await db.refuelFilters.toArray()
      filterName.value = refuelFilters[0].name
      filterActive.value = refuelFilters[0].active
      dateFrom.value = refuelFilters[0].dateFrom
      dateUntil.value = refuelFilters[0].dateUntil
    })()
  }

  return {
    filterName,
    filterActive,
    dateFrom,
    dateUntil,
    setFilter,
    removeFilter,
    readFilter
  }
})
