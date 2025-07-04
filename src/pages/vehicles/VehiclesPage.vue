<template>
  <q-page>
    <div
      v-if="vehicleStore.vehicles.length === 0"
      class="column items-center absolute-center"
    >
      <q-icon name="drive_eta" size="100px" color="accent" />
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
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import { useMainLayoutStore } from 'src/layouts/stores/mainLayoutStore'

const router = useRouter()
const vehicleStore = useVehicleStore()
const mainLayoutStore = useMainLayoutStore()
const $q = useQuasar()
const { t } = useI18n({ useScope: 'local', messages })
const optionsInDialog = ref<OptionInDialog[]>([
  {
    text: t('vehicles.optionsDialog.showRefuels'),
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
    text: t('vehicles.optionsDialog.edit'),
    icon: 'edit',
    action: (data: unknown) => {
      router.push({ path: `/vehicles/${data}/edit` })
    }
  },
  {
    text: t('vehicles.optionsDialog.delete'),
    icon: 'delete',
    action: (data: unknown) =>
      confirmDialog(
        t('vehicles.optionsDialog.deleteVehicle'),
        (data: unknown) => {
          $q.loading.show({
            delay: 400,
            spinnerColor: 'accent',
            messageColor: 'accent',
            message: t('vehicles.optionsDialog.deletingVehicle')
          })
          ;(async () => await vehicleStore.deleteVehicle(data as number))()
          $q.loading.hide()
        },
        data
      )
  }
])

onMounted(async () => {
  mainLayoutStore.titleText = t('vehicles.title')
  await vehicleStore.readVehicles()
})
</script>
