import { defineStore } from 'pinia'
import { ref } from 'vue'
import { date } from 'quasar'
import { refuelFilterRepository } from 'src/scripts/databaseRepositories'

export const useGraphRefuelFilterStore = defineStore(
  'graphRefuelFilterStore',
  () => {
    const filterName = ref<string>('')
    const filterActive = ref<boolean>(false)
    const dateFrom = ref<Date>(new Date())
    const dateUntil = ref<Date>(new Date())
    const filterId = 2

    async function setFilter() {
      const filter = await refuelFilterRepository.readFilter(filterId)
      if (!filter) return
      filter.name = filterName.value =
        date.formatDate(dateFrom.value, 'YYYY/MM/DD') +
        ' - ' +
        date.formatDate(dateUntil.value, 'YYYY/MM/DD')
      filter.active = filterActive.value = true
      filter.dateFrom = dateFrom.value
      filter.dateUntil = dateUntil.value
      await refuelFilterRepository.setFilter(filter)
    }

    async function removeFilter() {
      const filter = await refuelFilterRepository.readFilter(filterId)
      if (!filter) return
      filter.active = filterActive.value = false
      await refuelFilterRepository.setFilter(filter)
    }

    async function readFilter() {
      const filter = await refuelFilterRepository.readFilter(filterId)
      if (!filter) return
      filterName.value = filter.name
      filterActive.value = filter.active
      dateFrom.value = filter.dateFrom
      dateUntil.value = filter.dateUntil
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
  }
)
