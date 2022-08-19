<template>
  <q-page class="items-center justify-evenly">
    <graph-card
      v-for="data in refuelStore.graphData"
      :key="data.uid"
      :graphData="data"
      :periods="periods"
      class="q-pt-md q-pl-md q-pr-md"
    />
  </q-page>
</template>

<script setup lang="ts">
import GraphCard from 'src/components/GraphCard.vue'
import { GraphData, OptionInDialog, Period } from 'src/scripts/models'
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { productName } from '../../package.json'
import { optionsDialog } from 'src/scripts/dialogs'
import { useRefuelStore } from 'src/stores'
import { initSettings } from 'src/scripts/initSettings'

const refuelStore = useRefuelStore()

const periods = ref<Period[]>([])

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Move top',
    icon: 'keyboard_double_arrow_up',
    action: (graphData: GraphData) => refuelStore.moveGraphTop(graphData.uid)
  },
  {
    text: 'Move up',
    icon: 'keyboard_arrow_up',
    action: (graphData: GraphData) => refuelStore.moveGraphUp(graphData.uid)
  },
  {
    text: 'Move down',
    icon: 'keyboard_arrow_down',
    action: (graphData: GraphData) => refuelStore.moveGraphDown(graphData.uid)
  },
  {
    text: 'Move bottom',
    icon: 'keyboard_double_arrow_down',
    action: (graphData: GraphData) => refuelStore.moveGraphBottom(graphData.uid)
  }
]

emitter.on('showGraphOptionsDialog', payload =>
  optionsDialog(optionsInDialog, payload)
)

watchEffect(() => {
  // Emit inside watchEffect to catch site reloads
  emitter.emit(
    'updateTitle',
    (() => {
      if (!refuelStore.selectedVehicleId) return productName
      else if (refuelStore.plateNumberInTitleActive)
        return refuelStore.selectedVehiclePlateNumber
      return refuelStore.selectedVehicleName
    })()
  )
})

onMounted(async () => {
  initSettings()
  periods.value = await refuelStore.getPeriods()
})

onUnmounted(() => {
  emitter.off('showGraphOptionsDialog')
})
</script>
