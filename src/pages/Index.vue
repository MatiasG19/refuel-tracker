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
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { productName } from '../../package.json'
import { useRefuelStore } from 'src/stores'
import { initSettings } from 'src/scripts/initSettings'
import { GraphData, Period } from 'src/scripts/libraries/graphData/models'
import {
  OptionInDialog,
  optionsDialog
} from 'src/components/dialogs/optionsDialog'

const refuelStore = useRefuelStore()

const periods = ref<Period[]>([])

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Move top',
    icon: 'keyboard_double_arrow_up',
    action: (data: unknown) => refuelStore.moveGraphTop((data as GraphData).uid)
  },
  {
    text: 'Move up',
    icon: 'keyboard_arrow_up',
    action: (data: unknown) => refuelStore.moveGraphUp((data as GraphData).uid)
  },
  {
    text: 'Move down',
    icon: 'keyboard_arrow_down',
    action: (data: unknown) =>
      refuelStore.moveGraphDown((data as GraphData).uid)
  },
  {
    text: 'Move bottom',
    icon: 'keyboard_double_arrow_down',
    action: (data: unknown) =>
      refuelStore.moveGraphBottom((data as GraphData).uid)
  }
]

emitter.on('showGraphOptionsDialog', payload =>
  optionsDialog(optionsInDialog, payload)
)

watchEffect(() => {
  // Emit inside watchEffect to catch window reloads
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
