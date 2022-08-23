<template>
  <q-page>
    <vehicle-card
      v-for="(vehicle, i) in vehicles"
      :key="i"
      :vehicle="vehicle"
      class="q-pt-md q-pl-md q-pr-md"
      @click="selectVehicle(vehicle)"
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
import { Vehicle } from 'src/scripts/models'

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
          (id: number) => {
            ;(async () =>
              await refuelStore
                .deleteVehicle(id)
                .then(async () => await refuelStore.readVehicles()))()
          },
          id
        )
    }
  ])
)

async function selectVehicle(vehicle: Vehicle) {
  emitter.emit('updateTitle', vehicle.name)
  await refuelStore.changeSelectedVehicle({ ...vehicle })
  await router.push('/')
}

onMounted(async () => {
  emitter.emit('updateTitle', 'Vehicles')
  await refuelStore.readVehicles()
})

onUnmounted(() => {
  emitter.off('showVehicleOptionsDialog')
})
</script>
