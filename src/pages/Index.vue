<template>
  <q-page class="items-center justify-evenly">
    <graph-card
      v-for="(card, i) in cards"
      :key="i"
      :data="card"
      :periods="periods"
      :optionsInDialog="optionsInDialog"
      class="q-pt-md q-pl-md q-pr-md"
    />
  </q-page>
</template>

<script setup lang="ts">
import GraphCard from 'src/components/GraphCard.vue'
import { GraphData, OptionInDialog } from 'src/scripts/models'
import { onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { productName } from '../../package.json'
import { optionsDialog } from 'src/scripts/dialogs'

const cards: GraphData[] = [
  {
    title: 'Fuel consumption',
    value: 5.1,
    unit: 'L/100km',
    sequence: 1,
    periodId: 0
  },
  {
    title: 'Dinstance driven',
    value: 1900,
    unit: 'km',
    sequence: 2,
    periodId: 0
  },
  {
    title: 'Money spent',
    value: 450,
    unit: '€',
    sequence: 3,
    periodId: 0
  },
  {
    title: 'Fuel pricing',
    value: 7,
    unit: '€/100km',
    sequence: 4,
    periodId: 0
  },
  {
    title: 'Fuel burnt',
    value: 350,
    unit: 'Litre',
    sequence: 5,
    periodId: 0
  },
  {
    title: 'Refuels made',
    value: 20,
    unit: 'Refuels',
    sequence: 6,
    periodId: 0
  }
]

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
})

onUnmounted(() => {
  emitter.off('showGraphOptionsDialog')
})
</script>
