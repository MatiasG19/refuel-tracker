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
import { GraphData, OptionInDialog } from 'src/components/models'
import { onMounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { productName } from '../../package.json'

const cards: GraphData[] = [
  {
    title: 'Fuel consumption',
    value: 5.1,
    unit: 'L/100km',
    period: 0
  },
  {
    title: 'Dinstance driven',
    value: 1900,
    unit: 'km',
    period: 0
  },
  {
    title: 'Money spent',
    value: 450,
    unit: '€',
    period: 0
  },
  {
    title: 'Fuel pricing',
    value: 7,
    unit: '€/100km',
    period: 0
  },
  {
    title: 'Fuel burnt',
    value: 350,
    unit: 'Litre',
    period: 0
  },
  {
    title: 'Refuels made',
    value: 20,
    unit: '',
    period: 0
  }
]

const periods: string[] = [
  'Week',
  '3 Months',
  '6 Months',
  'Year',
  'Max'
]

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Move top',
    icon: 'keyboard_double_arrow_up',
    action: action
  },
  {
    text: 'Move up',
    icon: 'keyboard_arrow_up',
    action: action
  },
  {
    text: 'Move down',
    icon: 'keyboard_arrow_down',
    action: action
  },
  {
    text: 'Move bottom',
    icon: 'keyboard_double_arrow_down',
    action: action
  }
]

let showPlateNumber = false
let carName = 'My car name'

function action() {
  ;
}

onMounted(() => {
  emitter.emit('updateTitle', showPlateNumber == false ?
    (carName.trim() != '' ? carName : productName) : 'HH:XX2022')
})

</script>
