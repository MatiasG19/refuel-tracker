<template>
  <q-page>
    <vehicle-card
      v-for="(vehicle, i) in vehicles"
      :key="i"
      :vehicle="vehicle"
      class="q-pt-md q-pl-md q-pr-md"
      @click="router.push('/')"
    />
  </q-page>
</template>

<script setup lang="ts">
import VehicleCard from 'src/components/VehicleCard.vue'
import { optionsDialog, confirmDialog } from 'src/scripts/dialogs'
import { useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { useRefuelStore } from 'src/stores'

const router = useRouter()
const refuelStore = useRefuelStore()

const vehicles = computed(() => refuelStore.vehicles)

emitter.on('showVehicleOptionsDialog', id =>
  optionsDialog([
    {
      text: 'Edit',
      icon: 'edit',
      action: () =>
        router.push({ path: `/vehicles/edit/${id}`, params: { id } })
    },
    {
      text: 'Delete',
      icon: 'delete',
      action: () =>
        confirmDialog(
          'Delete vehicle?',
          async (id: number): void =>
            await refuelStore
              .deleteVehicle(id)
              .then(() => refuelStore.readVehicles()),
          id
        )
    }
  ])
)

onMounted(async () => {
  emitter.emit('updateTitle', 'Vehicles')
  await refuelStore.readVehicles()
})

onUnmounted(() => {
  emitter.off('showVehicleOptionsDialog')
})
</script>
