<template>
    <q-page class="items-center justify-evenly">
      <vehicle-entry-card
        v-for="(card, i) in cards"
        :key="i"
        :data="card"
        :optionsInDialog="optionsInDialog"
        class="q-pt-md q-pl-md q-pr-md"
      />
    </q-page>
</template>

<script setup lang="ts">
import VehicleEntryCard from 'src/components/VehicleEntryCard.vue'
import { VehicleEntry, OptionInDialog } from 'src/components/models'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Edit',
    icon: 'edit',
    action: () => router.push('/vehicle-form')
  },
  {
    text: 'Delete',
    icon: 'delete',
    action: () => console.log('delete')
  }
]

</script>
