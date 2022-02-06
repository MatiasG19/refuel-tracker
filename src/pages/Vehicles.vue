<template>
  <q-page>
    <vehicle-entry-card
      v-for="(vehicle, i) in vehicleEntries"
      :key="i"
      :data="vehicle"
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
import { useRefuelStore } from 'src/stores'

const router = useRouter()
const refuelStore = useRefuelStore()

const vehicleEntries: Vehicle[] = refuelStore.vehicles

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
  refuelStore.readVehicles()
})

onUnmounted(() => {
  emitter.off('showVehicleOptionsDialog')
})
</script>
