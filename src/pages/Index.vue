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

const cards: GraphData[] = [
  {
    title: 'Fuel Consumption',
    value: 5.1,
    unit: 'L/100km',
    period: 0
  },
  {
    title: 'Fuel Pricing',
    value: 7,
    unit: '€/100km',
    period: 0
  },
  {
    title: 'Range',
    value: 1900,
    unit: 'km',
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

function action() {
  ;
}

</script>
