<template>
  <q-page>
    <div
      v-if="vehicleStore.vehicles.length === 0"
      class="column items-center absolute-center"
    >
      <q-icon name="drive_eta" size="100px" color="accent" />
      <q-btn
        color="accent"
        :label="gt[settingsStore.locale]['placeholders']['addVehicle']"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/vehicles/add')"
      />
    </div>
    <template v-else>
      <vehicle-card
        v-for="vehicle in vehicleStore.vehicles"
        :key="vehicle.id"
        :vehicle="vehicle"
        class="q-pt-md q-pl-md q-pr-md"
        @on-options-click="payload => optionsDialog(optionsInDialog, payload)"
      />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import VehicleCard from 'src/pages/vehicles/components/VehicleCard.vue'
import {
  OptionInDialog,
  optionsDialog
} from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useVehicleStore } from './stores/vehicleStore'
import { useQuasar } from 'quasar'

import gt from 'src/i18n'
import t from './i18n'
import { useMainLayoutStore } from 'src/layouts/stores/mainLayoutStore'
import { useSettingsStore } from '../settings/stores/settingsStore'

const router = useRouter()
const vehicleStore = useVehicleStore()
const mainLayoutStore = useMainLayoutStore()
const $q = useQuasar()
const settingsStore = useSettingsStore()
const optionsInDialog = ref<OptionInDialog[]>([
  {
    text: t[settingsStore.locale]['vehicles']['optionsDialog']['showRefuels'],
    icon: 'local_gas_station',
    action: (data: unknown) => {
      ;(async () => {
        router.push({
          path: `/vehicles/${data}/refuels`
        })
      })()
    }
  },
  {
    text: t[settingsStore.locale]['vehicles']['optionsDialog']['edit'],
    icon: 'edit',
    action: (data: unknown) => {
      router.push({ path: `/vehicles/${data}/edit` })
    }
  },
  {
    text: t[settingsStore.locale]['vehicles']['optionsDialog']['delete'],
    icon: 'delete',
    action: (data: unknown) =>
      confirmDialog(
        t[settingsStore.locale]['vehicles']['optionsDialog']['deleteVehicle'],
        (data: unknown) => {
          $q.loading.show({
            delay: 400,
            spinnerColor: 'accent',
            messageColor: 'accent',
            message:
              t[settingsStore.locale]['vehicles']['optionsDialog'][
                'deletingVehicle'
              ]
          })
          ;(async () => await vehicleStore.deleteVehicle(data as number))()
          $q.loading.hide()
        },
        data
      )
  }
])

onMounted(async () => {
  mainLayoutStore.titleText = t[settingsStore.locale]['vehicles']['title']
  await vehicleStore.readVehicles()
})
</script>
