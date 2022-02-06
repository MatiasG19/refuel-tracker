<template>
  <q-page>
    <vehicle-card
      v-for="(vehicle, i) in vehicles"
      :key="i"
      :data="vehicle"
      :optionsInDialog="optionsInDialog"
      class="q-pt-md q-pl-md q-pr-md"
      @click="router.push('/')"
    />
  </q-page>
</template>

<script setup lang="ts">
import VehicleCard from 'src/components/VehicleEntryCard.vue'
import { optionsDialog, confirmDialog } from 'src/scripts/dialogs'
import { OptionInDialog } from 'src/scripts/models'
import { useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { useRefuelStore } from 'src/stores'

const router = useRouter()
const refuelStore = useRefuelStore()

const vehicles = computed(() => refuelStore.vehicles)

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
