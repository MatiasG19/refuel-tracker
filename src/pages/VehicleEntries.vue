<template>
  <q-page>
    <vehicle-entry-card
      v-for="(card, i) in cards"
      :key="i"
      :data="card"
      :optionsInDialog="optionsInDialog"
      class="q-pt-md q-pl-md q-pr-md"
      @click="router.push('/')"
    />
  </q-page>
</template>

<script setup lang="ts">
import VehicleEntryCard from 'src/components/VehicleEntryCard.vue'
import { optionsDialog, confirmDialog } from 'src/scripts/dialogs'
import { Vehicle, OptionInDialog } from 'src/scripts/models'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'

const router = useRouter()

const cards: Vehicle[] = [
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    currencyUnit: '',
    fuelUnitId: 0,
    fuelUnit: {
      id: 1,
      fuelConsumptionUnit: 'L/100km',
      distanceUnit: '',
      fuelUnit: ''
    }
  },
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    currencyUnit: '',
    fuelUnitId: 0,
    fuelUnit: {
      id: 1,
      fuelConsumptionUnit: 'L/100km',
      distanceUnit: '',
      fuelUnit: ''
    }
  },
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    currencyUnit: '',
    fuelUnitId: 0,
    fuelUnit: {
      id: 1,
      fuelConsumptionUnit: 'L/100km',
      distanceUnit: '',
      fuelUnit: ''
    }
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
    action: () => confirmDialog('Delete vehicle?')
  }
]

emitter.on('showVehicleOptionsDialog', () => optionsDialog(optionsInDialog))

onMounted(() => {
  emitter.emit('updateTitle', 'Vehicles')
})

onUnmounted(() => {
  emitter.off('showVehicleOptionsDialog')
})
</script>
