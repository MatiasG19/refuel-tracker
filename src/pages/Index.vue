<template>
  <q-page class="items-center justify-evenly">
    <graph-card
      v-for="(card, i) in cards"
      :key="i"
      :data="card"
      :periods="periods"
      class="q-pt-md q-pl-md q-pr-md"
      ></graph-card>
  </q-page>
</template>

<script lang="ts">
import GraphCard from 'src/components/GraphCard.vue';
import { GraphData } from 'src/components/models'
import { defineComponent, ref } from 'vue';

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
  "Week",
  "3 Months",
  "6 Months",
  "Year",
  "Max"
]

export default defineComponent({
  name: 'Graphs',
  components: { GraphCard },
  setup() {

    return { cards, periods };
  }
});
</script>
