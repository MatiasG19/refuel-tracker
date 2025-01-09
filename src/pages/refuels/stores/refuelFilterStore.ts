import { defineStore } from 'pinia'
import { ref, toRaw } from 'vue'
import { refuelFilterRepository } from 'src/scripts/databaseRepositories'
import { type RefuelFilter } from '../models'
import { date } from 'quasar'

export const useRefuelFilterStore = defineStore('refuelFilterStore', () => {
  const filter = ref<RefuelFilter | null>(null)
  const filterId = 1

  async function setFilter() {
    if (!filter.value) return
    filter.value.active = true
    filter.value.title =
      date.formatDate(filter.value.dateFrom, 'YYYY/MM/DD') +
      ' - ' +
      date.formatDate(filter.value.dateUntil, 'YYYY/MM/DD')
    await refuelFilterRepository.setFilter(toRaw(filter.value))
  }

  async function removeFilter() {
    if (!filter.value) return
    filter.value.active = false
    await refuelFilterRepository.removeFilter(filterId)
  }

  async function readFilter() {
    filter.value = await refuelFilterRepository.readFilter(filterId)

    if (!filter.value || filter.value.active) return
    filter.value.title =
      date.formatDate(filter.value.dateFrom, 'YYYY/MM/DD') +
      ' - ' +
      date.formatDate(filter.value.dateUntil, 'YYYY/MM/DD')
    let d = new Date()
    d.setDate(d.getDate() - 30) // Start 30 days in the past
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    filter.value.dateFrom = d
    d = new Date()
    d.setHours(23)
    d.setMinutes(59)
    d.setSeconds(59)
    d.setMilliseconds(999)
    filter.value.dateUntil = d
  }

  return {
    filter,
    setFilter,
    removeFilter,
    readFilter
  }
})
