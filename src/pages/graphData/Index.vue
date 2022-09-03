<template>
  <q-page class="items-center justify-evenly">
    <template v-if="loading">
      <q-spinner
        class="absolute-center"
        color="primary"
        size="3em"
        :thickness="10"
      />
    </template>
    <template v-else>
      <graph-card
        v-for="data in graphData"
        :key="data.uid"
        :graphData="data"
        :periods="periods"
        class="q-pt-md q-pl-md q-pr-md"
      />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import GraphCard from 'src/pages/graphData/components/GraphCard.vue'
import { ref, watchEffect, computed, onBeforeMount, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { productName } from '../../../package.json'
import { useRefuelStore, useSettingsStore } from 'src/stores'
import { useGraphDataStore } from './stores/graphDataStore'
import { initSettings } from 'src/scripts/initSettings'
import { GraphData, Period } from 'src/pages/graphData/scripts/models'
import {
  OptionInDialog,
  optionsDialog
} from 'src/components/dialogs/optionsDialog'
import { useQuasar } from 'quasar'

const $q = useQuasar()
$q.dark.set('auto')

const refuelStore = useRefuelStore()
const graphDataStore = useGraphDataStore()
const settingsStore = useSettingsStore()

const loading = ref(false)
const periods = ref<Period[]>([])

const graphData = computed(() => graphDataStore.graphData)

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Move top',
    icon: 'keyboard_double_arrow_up',
    action: (data: unknown) =>
      graphDataStore.moveGraphCard.moveTop((data as GraphData).uid)
  },
  {
    text: 'Move up',
    icon: 'keyboard_arrow_up',
    action: (data: unknown) =>
      graphDataStore.moveGraphCard.moveUp((data as GraphData).uid)
  },
  {
    text: 'Move down',
    icon: 'keyboard_arrow_down',
    action: (data: unknown) =>
      graphDataStore.moveGraphCard.moveDown((data as GraphData).uid)
  },
  {
    text: 'Move bottom',
    icon: 'keyboard_double_arrow_down',
    action: (data: unknown) =>
      graphDataStore.moveGraphCard.moveBottom((data as GraphData).uid)
  }
]

emitter.on('showGraphOptionsDialog', payload =>
  optionsDialog(optionsInDialog, payload)
)

emitter.on('selectedVehicleChanged', () =>
  (() => {
    graphDataStore
      .readGraphData()
      .then(() => setTimeout(() => (loading.value = false), 100))
    loading.value = false
  })()
)

watchEffect(() => {
  // Emit inside watchEffect to catch window reloads
  emitter.emit(
    'updateTitle',
    (() => {
      if (!settingsStore.selectedVehicleId) return productName
      else if (settingsStore.plateNumberInTitleActive)
        return settingsStore.selectedVehiclePlateNumber
      return settingsStore.selectedVehicleName
    })()
  )
})

onBeforeMount(async () => {
  initSettings()
  periods.value = await refuelStore.getPeriods()
})

onUnmounted(() => {
  emitter.off('showGraphOptionsDialog')
  emitter.off('selectedVehicleChanged')
})
</script>
