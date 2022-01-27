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
      <confirm-dialog
        label="Delete?"
        :dialogVisible="true"
      />
    </q-page>
</template>

<script setup lang="ts">
import VehicleEntryCard from 'src/components/VehicleEntryCard.vue'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import { Vehicle, OptionInDialog } from 'src/scripts/models'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { emitter } from 'src/boot/mitt'

const router = useRouter()

const cards: Vehicle[] = [
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    currencyUnit: '',
    fuelUnitId: 0,
    fuelUnit: { id: 1, fuelConsumptionUnit: 'L/100km', distanceUnit: '', fuelUnit: '' }
  },
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    currencyUnit: '',
    fuelUnitId: 0,
    fuelUnit: { id: 1, fuelConsumptionUnit: 'L/100km', distanceUnit: '', fuelUnit: '' }
  },
  {
    id: 1,
    name: 'Seat',
    plateNumber: 'HL:MG1908',
    currencyUnit: '',
    fuelUnitId: 0,
    fuelUnit: { id: 1, fuelConsumptionUnit: 'L/100km', distanceUnit: '', fuelUnit: '' }
  },
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
