<template>
  <q-page>
    <TransitionGroup name="fadein">
      <template v-if="!loading">
        <div v-if="vehiclesExists && filterActive" class="q-pt-md text-center">
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
          v-if="vehiclesExists && refuels.length === 0"
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
        <div v-else-if="!vehiclesExists" class="absolute-center items-center">
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
          <div class="q-px-md q-gutter-md">
            <q-badge align="top">{{ vehicleName }}</q-badge>
          </div>

          <refuel-card
            v-for="(refuel, i) in refuels"
            :key="i"
            :refuel="refuel"
            :vehicle="vehicle"
            :fuelConsumption="
              vehicleFuelConsumption(vehicle, refuel.id).toFixed(2)
            "
            class="q-pt-md q-pl-md q-pr-md"
          />
        </template>
      </template>
    </TransitionGroup>
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/pages/refuels/components/RefuelCard.vue'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()

const vehicle = ref<Vehicle>(new Vehicle())
const filterActive = ref(settingsStore.refuelFilterActive)
const filterHint = 'Filter 1 Month from 2021.12.19'
const vehiclesExists = settingsStore.selectedVehicleId
const vehicleName = ref<string>('')
const loading = ref(true)

let refuels = computed(() => {
  if (!filterActive.value)
    return [...refuelStore.refuels].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    )
  return refuelStore.refuels
})

function removeFilter() {
  settingsStore.toggleRefuelFilter(false)
  filterActive.value = false
}

emitter.on('showRefuelOptionsDialog', id =>
  optionsDialog([
    {
      text: 'Edit',
      icon: 'edit',
      action: () => {
        router.push({ path: `/refuels/edit/${id}`, params: { id } })
      }
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

  vehicleName.value = settingsStore.plateNumberInTitleActive
    ? settingsStore.selectedVehiclePlateNumber
    : settingsStore.selectedVehicleName

  await refuelStore.readRefuels(settingsStore.selectedVehicleId ?? 0)
  vehicle.value =
    (await refuelStore.getVehicle(settingsStore.selectedVehicleId ?? 0)) ??
    vehicle.value

  loading.value = false
})

onUnmounted(() => {
  emitter.off('showRefuelOptionsDialog')
})
</script>
