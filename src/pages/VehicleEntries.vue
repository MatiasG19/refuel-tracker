<template>
    <q-page class="items-center justify-evenly">
      <vehicle-entry-card
        v-for="(card, i) in cards"
        :key="i"
        :data="card"
        class="q-pt-md q-pl-md q-pr-md"
      />
    </q-page>
</template>

<script setup lang="ts">
import VehicleEntryCard from 'src/components/VehicleEntryCard.vue';
import { VehicleEntry } from 'src/components/models'

const cards: VehicleEntry[] = [
  {
    id: 0,
    name: 'Seat',
    plateNumber: 'HL:MG1908'
  },
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908'
  },
  {
    id: 2,
    name: 'Seat',
    plateNumber: 'HL:MG1908'
  }
]

</script>
