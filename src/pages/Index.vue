<template>
  <q-page class="items-center justify-evenly">
    <graph-card
      v-for="(data, i) in graphData"
      :key="i"
      :data="data"
      :periods="periods"
      :optionsInDialog="optionsInDialog"
      class="q-pt-md q-pl-md q-pr-md"
    />
  </q-page>
</template>

<script setup lang="ts">
import GraphCard from 'src/components/GraphCard.vue'
import { OptionInDialog } from 'src/scripts/models'
import { computed, onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { productName } from '../../package.json'
import { optionsDialog } from 'src/scripts/dialogs'
import { useRefuelStore } from 'src/stores'

const refuelStore = useRefuelStore()

let graphData = computed(() => refuelStore.graphData)

const periods: string[] = ['Week', '3 Months', '6 Months', 'Year', 'Max']

let showPlateNumber = false
let carName = 'My car name'

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

onMounted(() => {
  emitter.emit(
    'updateTitle',
    showPlateNumber == false
      ? carName.trim() != ''
        ? carName
        : productName
      : 'HH:XX2022'
  )
  refuelStore.readGraphData()
  graphData = refuelStore.graphData
})

onUnmounted(() => {
  emitter.off('showGraphOptionsDialog')
})
</script>
