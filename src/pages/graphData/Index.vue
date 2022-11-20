<template>
  <q-page class="items-center">
    <div
      v-if="vehiclesExits && graphData.length === 0"
      class="absolute-center items-center"
    >
      <div class="row">
        <q-icon class="col" name="img:bar_chart.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        label="Add refuel"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/refuels/add')"
      />
    </div>
    <div v-else-if="!vehiclesExits" class="absolute-center">
      <div class="row">
        <q-icon class="col" name="img:bar_chart.svg" size="100px" />
      </div>
      <q-btn
        class="row"
        color="accent"
        label="Add vehicle"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/vehicles/add')"
      />
    </div>
    <template v-else>
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
    </template>
  </q-page>
</template>

<script setup lang="ts">
import GraphCard from 'src/pages/graphData/components/GraphCard.vue'
import {
  ref,
  watchEffect,
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted
} from 'vue'
import { emitter } from 'src/boot/mitt'
import packageJson from '../../../package.json'
import { useRefuelStore, useSettingsStore } from 'src/stores'
import { useGraphDataStore } from './stores/graphDataStore'
import { initSettings } from 'src/scripts/initSettings'
import { GraphData, Period } from 'src/pages/graphData/scripts/models'
import {
  OptionInDialog,
  optionsDialog
} from 'src/components/dialogs/optionsDialog'
import { useQuasar } from 'quasar'
import { useCheckForUpdate } from 'src/scripts/libraries/utils'
import { useRouter } from 'vue-router'

const $q = useQuasar()
$q.dark.set('auto')

const router = useRouter()
const refuelStore = useRefuelStore()
const graphDataStore = useGraphDataStore()
const settingsStore = useSettingsStore()
const checkForUpdate = useCheckForUpdate()

const loading = ref(false)
const periods = ref<Period[]>([])
const graphData = computed(() => graphDataStore.graphData)
const vehiclesExits = settingsStore.selectedVehicleId
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
      if (!settingsStore.selectedVehicleId) return packageJson.productName
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

onMounted(() => {
  checkForUpdate()
})

onUnmounted(() => {
  emitter.off('showGraphOptionsDialog')
  emitter.off('selectedVehicleChanged')
})
</script>
