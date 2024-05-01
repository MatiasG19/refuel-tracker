<template>
  <q-page>
    <div v-if="vehicleData.length === 0" class="absolute-center items-center">
      <div class="row">
        <q-icon class="col" name="img:directions_car.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        :label="i18n.global.t('placeholders.addVehicle')"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/vehicles/add')"
      />
    </div>
    <template v-else>
      <vehicle-card
        v-for="vehicle in vehicleData"
        :key="vehicle.id"
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
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useVehicleStore } from './stores/vehicleStore'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import { useMainLayoutStore } from 'src/layouts/stores'

const router = useRouter()
const vehicleStore = useVehicleStore()
const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()
const $q = useQuasar()
const { t } = useI18n({ useScope: 'local', messages })

const vehicleData = computed(() => {
  if (vehicleStore.vehicles) return vehicleStore.getAllVehicleData()
  return []
})

emitter.on('showVehicleOptionsDialog', id =>
  optionsDialog([
    {
      text: t('vehicles.optionsDialog.showRefuels'),
      icon: 'local_gas_station',
      action: () => {
        ;(async () => {
          const vehicle = await vehicleStore.getVehicle(id)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await settingsStore.changeSelectedVehicle({ ...vehicle! })
          router.push('/refuels')
        })()
      }
    },
    {
      text: t('vehicles.optionsDialog.edit'),
      icon: 'edit',
      action: () => {
        router.push({ path: `/vehicles/${id}/edit` })
      }
    },
    {
      text: t('vehicles.optionsDialog.delete'),
      icon: 'delete',
      action: () =>
        confirmDialog(
          t('vehicles.optionsDialog.deleteVehicle'),
          (id: number) => {
            $q.loading.show({
              delay: 400,
              spinnerColor: 'accent',
              messageColor: 'accent',
              message: t('vehicles.optionsDialog.deletingVehicle')
            })
            ;(async () =>
              await vehicleStore
                .deleteVehicle(id)
                .then(async () => await vehicleStore.readVehicles()))()
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
  mainLayoutStore.titleText = t('vehicles.title')
  await vehicleStore.readVehicles()
})

onUnmounted(() => {
  emitter.off('showVehicleOptionsDialog')
})
</script>
