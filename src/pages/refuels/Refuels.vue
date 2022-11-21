<template>
  <q-page>
    <div v-if="vehiclesExit && filterActive" class="q-pt-md text-center">
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
    <div
      v-if="vehiclesExit && refuels.length === 0"
      class="absolute-center items-center"
    >
      <div class="row">
        <q-icon class="col" name="img:local_gas_station.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        label="Add refuel"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/refuels/add')"
      />
    </div>
    <div v-else-if="!vehiclesExit" class="absolute-center items-center">
      <div class="row">
        <q-icon class="col" name="img:local_gas_station.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        label="Add vehicle"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/vehicles/add')"
      />
    </div>
    <template v-else>
      <refuel-card
        v-for="(refuel, i) in refuels"
        :key="i"
        :refuel="refuel"
        :vehicle="vehicle"
        class="q-pt-md q-pl-md q-pr-md"
      />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/pages/refuels/components/RefuelCard.vue'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useRefuelStore, useSettingsStore } from 'src/stores'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()

const vehicle = ref<Vehicle>(new Vehicle())
const filterActive = ref(settingsStore.refuelFilterActive)
const filterHint = 'Filter 1 Month from 2021.12.19'
const vehiclesExit = settingsStore.selectedVehicleId

let refuels = computed(() => {
  if (!filterActive.value) return orderByDateDesc()
  return refuelStore.refuels
})

function orderByDateDesc(): Refuel[] {
  return refuelStore.refuels.sort((a, b) => b.date.getTime() - a.date.getTime())
}

function removeFilter() {
  settingsStore.toggleRefuelFilter(false)
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
                      settingsStore.selectedVehicleId ?? 0
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
  await refuelStore.readRefuels(settingsStore.selectedVehicleId ?? 0)
  vehicle.value =
    (await refuelStore.getVehicle(settingsStore.selectedVehicleId ?? 0)) ??
    vehicle.value
})

onUnmounted(() => {
  emitter.off('showRefuelOptionsDialog')
})
</script>
