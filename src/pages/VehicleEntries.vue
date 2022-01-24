<template>
    <q-page>
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
import { Vehicle, OptionInDialog } from 'src/components/models'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { emitter } from 'src/boot/mitt'

const router = useRouter()

const cards: Vehicle[] = [
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    fuelUnit: { id: 1, Unit: 'L/100km' }
  },
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    fuelUnit: { id: 1, Unit: 'L/100km' }
  },
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    fuelUnit: { id: 1, Unit: 'L/100km' }
  }
]

const optionsInDialog: OptionInDialog[] = [
  {
    text: 'Edit',
    icon: 'edit',
    action: () => router.push('/vehicles/edit')
  },
  {
    text: 'Delete',
    icon: 'delete',
    action: () => console.log('delete')
  }
]

onMounted(() => {
    emitter.emit('updateTitle', 'Vehicles')
})

</script>
