<template>
  <q-page class="items-center justify-evenly">
    <graph-card
      v-for="(data, i) in graphData"
      :key="i"
      :graphData="data"
      :periods="periods"
      class="q-pt-md q-pl-md q-pr-md"
    />
  </q-page>
</template>

<script setup lang="ts">
import GraphCard from 'src/components/GraphCard.vue'
import { GraphData, OptionInDialog, Period, Vehicle } from 'src/scripts/models'
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { productName } from '../../package.json'
import { optionsDialog } from 'src/scripts/dialogs'
import { useMainStore, useRefuelStore } from 'src/stores'
import { GraphDataFactory } from 'src/scripts/GraphData/GraphDataFactory'
import { initSettings } from 'src/scripts/initSettings'

const mainStore = useMainStore()
const refuelStore = useRefuelStore()

let graphData = ref<GraphData[]>([])
const periods = ref<Period[]>([])

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Move top',
    icon: 'keyboard_double_arrow_up',
    action: () => console.log('move graph card')
  },
  {
    text: 'Move up',
    icon: 'keyboard_arrow_up',
    action: () => console.log('move graph card')
  },
  {
    text: 'Move down',
    icon: 'keyboard_arrow_down',
    action: () => console.log('move graph card')
  },
  {
    text: 'Move bottom',
    icon: 'keyboard_double_arrow_down',
    action: () => console.log('move graph card')
  }
]

emitter.on('showGraphOptionsDialog', () => optionsDialog(optionsInDialog))

watchEffect(() => {
  ;(async () => {
    // Load graph data
    if (mainStore.selectedVehicleId) {
      const vehicle = await refuelStore.getAllVehicleData(
        mainStore.selectedVehicleId
      )
      const factory = new GraphDataFactory(vehicle as Vehicle)
      graphData.value = factory.getGraphData(
        await refuelStore.getGraphSettings()
      )

      // Emit title
      emitter.emit(
        'updateTitle',
        (() => {
          if (!mainStore.selectedVehicleId) return productName
          else if (mainStore.plateNumberInTitleActive)
            return mainStore.selectedVehiclePlateNumber
          return mainStore.selectedVehicleName
        })()
      )
    }
  })()
})

onMounted(async () => {
  initSettings()
  periods.value = await refuelStore.getPeriods()
})

onUnmounted(() => {
  emitter.off('showGraphOptionsDialog')
})
</script>
