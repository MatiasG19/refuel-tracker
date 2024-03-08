<template>
  <q-page>
    <div v-if="vehicleData.length === 0" class="absolute-center items-center">
      <div class="row">
        <q-icon class="col" name="img:directions_car.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        :label="t('pages.vehicles.vehicles.addVehicle')"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/vehicles/add')"
      />
    </div>
    <template v-else>
      <vehicle-card
        v-for="(vehicle, i) in vehicleData"
        :key="i"
        :vehicle="vehicle"
        class="q-pt-md q-pl-md q-pr-md"
        @click="selectVehicle(vehicle)"
      />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import VehicleCard from 'src/pages/vehicles/components/VehicleCard.vue'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import { emitter } from 'src/boot/mitt'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()
const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { t } = useI18n()

const vehicleData = computed(() => {
  if (refuelStore.vehicles) return refuelStore.getAllVehicleData()
  return []
})

emitter.on('showVehicleOptionsDialog', id =>
  optionsDialog([
    {
      text: 'Show refuels',
      icon: 'local_gas_station',
      action: () => {
        ;(async () => {
          const vehicle = await refuelStore.getVehicle(id)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await settingsStore.changeSelectedVehicle({ ...vehicle! })
          router.push('/refuels')
        })()
      }
    },
    {
      text: 'Edit',
      icon: 'edit',
      action: () => {
        router.push({ path: `/vehicles/edit/${id}`, params: { id } })
      }
    },
    {
      text: 'Delete',
      icon: 'delete',
      action: () =>
        confirmDialog(
          'Delete vehicle?',
          (id: number) => {
            $q.loading.show({
              delay: 400,
              spinnerColor: 'accent',
              messageColor: 'accent',
              message: 'Deleting vehicle'
            })
            ;(async () =>
              await refuelStore
                .deleteVehicle(id)
                .then(async () => await refuelStore.readVehicles()))()
            $q.loading.hide()
          },
          id
        )
    }
  ])
)

async function selectVehicle(vehicle: Vehicle) {
  await settingsStore.changeSelectedVehicle({ ...vehicle })
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
