<template>
  <q-page>
    <div v-if="filterActive" class="q-pt-md text-center">
      <q-btn
        class="q-pa-xs"
        style="color: pink"
        flat
        no-caps
        label=" "
        @click="removeFilter"
        icon-right="delete_outline"
        >{{ filterHint }}</q-btn
      >
    </div>
    <refuel-card
      v-for="(refuel, i) in refuels"
      :key="i"
      :refuel="refuel"
      :vehicle="vehicle"
      class="q-pt-md q-pl-md q-pr-md"
    />
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/components/RefuelCard.vue'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useRefuelStore } from 'src/stores'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'

const router = useRouter()
const refuelStore = useRefuelStore()

const vehicle = ref<Vehicle>(new Vehicle())
const filterActive = ref(refuelStore.refuelFilterActive)
const filterHint = 'Filter 1 Month from 2021.12.19'

let refuels = computed(() => {
  if (!filterActive.value) return orderByDateDesc()
  return refuelStore.refuels
})

function orderByDateDesc(): Refuel[] {
  return refuelStore.refuels.sort((a, b) => b.date.getTime() - a.date.getTime())
}

function removeFilter() {
  refuelStore.settings.toggleRefuelFilter(false)
  filterActive.value = false
}

emitter.on('showRefuelOptionsDialog', id =>
  optionsDialog([
    {
      text: 'Edit',
      icon: 'edit',
      action: () => router.push({ path: `/refuels/edit/${id}`, params: { id } })
    },
    {
      text: 'Delete',
      icon: 'delete',
      action: () =>
        confirmDialog(
          'Delete refuel entry?',
          (id: number) => {
            ;(async () =>
              await refuelStore
                .deleteRefuel(id)
                .then(
                  async () =>
                    await refuelStore.readRefuels(
                      refuelStore.selectedVehicleId ?? 0
                    )
                ))()
          },
          id
        )
    }
  ])
)

onMounted(async () => {
  emitter.emit('updateTitle', 'Refuels')
  await refuelStore.readRefuels(refuelStore.selectedVehicleId ?? 0)
  vehicle.value =
    (await refuelStore.getVehicle(refuelStore.selectedVehicleId ?? 0)) ??
    vehicle.value
})

onUnmounted(() => {
  emitter.off('showRefuelOptionsDialog')
})
</script>
