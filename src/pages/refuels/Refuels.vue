<template>
  <q-page>
    <div
      v-if="
        vehiclesExists &&
        refuels.length === 0 &&
        !refuelFilterStore.filterActive
      "
      class="absolute-center items-center"
    >
      <div class="row">
        <q-icon class="col" name="img:local_gas_station.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        :label="t('placeholders.addRefuel')"
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
        :label="t('placeholders.addVehicle')"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push('/vehicles/add')"
      />
    </div>
    <template v-else>
      <div class="q-px-md q-pb-xs q-gutter-md">
        <q-badge>{{ vehicleName }}</q-badge>
      </div>

      <div
        v-if="vehiclesExists && refuelFilterStore.filterActive"
        class="q-pt-md text-center"
      >
        <q-btn
          class="q-pa-xs"
          style="color: pink"
          flat
          no-caps
          label=" "
          @click="removeFilter"
          icon-right="delete_outline"
          >{{ refuelFilterStore.filterName }}</q-btn
        >
      </div>

      <q-virtual-scroll
        ref="virtualListRef"
        style="max-height: 90vh; overflow-x: hidden"
        :items-size="refuels.length"
        :items-fn="getRefuels"
        :virtual-scroll-item-size="200"
        virtual-scroll-slice-ratio-before="4"
        virtual-scroll-slice-ratio-after="4"
        v-slot="{ item, index }"
      >
        <refuel-card
          :key="index"
          :refuel="item"
          :vehicle="vehicle"
          :fuelConsumption="vehicleFuelConsumption(vehicle, item).toFixed(2)"
          :loading="loading"
          class="q-pt-md q-pl-md q-pr-md"
        />
      </q-virtual-scroll>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/pages/refuels/components/RefuelCard.vue'
import { computed, ref, onUnmounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useRefuelStore } from 'src/stores/refuelStore'
import { Refuel, Vehicle } from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { QVirtualScroll } from 'quasar'
import { useRefuelFilterStore } from './stores/refuelFilterStore'
import { useI18n } from 'vue-i18n'
import messages from './i18n'

const router = useRouter()
const refuelStore = useRefuelStore()
const settingsStore = useSettingsStore()
const refuelFilterStore = useRefuelFilterStore()
const { t } = useI18n({ useScope: 'local', messages })

const vehicle = ref<Vehicle>(new Vehicle())
const vehiclesExists = settingsStore.selectedVehicleId
const vehicleName = ref<string>('')
const loading = ref(true)
const virtualListRef = ref(null)
let scrollToIndex = ref(0)

const props = defineProps({
  id: {
    type: Number
  }
})

let refuels = computed(() => {
  let items = []
  if (refuelFilterStore.filterActive)
    items = [...refuelStore.refuels]
      .filter(
        r =>
          r.date.getTime() >= refuelFilterStore.dateFrom.getTime() &&
          r.date.getTime() <= refuelFilterStore.dateUntil.getTime()
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  else
    items = [...refuelStore.refuels].sort(
      (a, b) => b.date.getTime() - a.date.getTime()
    )

  return items
})

function getRefuels(from: number, size: number): ReadonlyArray<Refuel> {
  const items = []
  for (let i = 0; i < size; i++) {
    items.push(refuels.value[from + i])
  }
  return items
}

function removeFilter() {
  refuelFilterStore.removeFilter()
}

emitter.on('showRefuelOptionsDialog', id =>
  optionsDialog([
    {
      text: t('refuels.optionsDialog.edit'),
      icon: 'edit',
      action: () => {
        router.push({ path: `/refuels/${id}/edit` })
      }
    },
    {
      text: t('refuels.optionsDialog.delete'),
      icon: 'delete',
      action: () =>
        confirmDialog(
          t('refuels.optionsDialog.deleteRefuel'),
          (id: number) => {
            ;(async () =>
              refuelStore
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

onBeforeMount(async () => {
  emitter.emit('updateTitle', t('refuels.title'))

  vehicleName.value = settingsStore.plateNumberInTitleActive
    ? settingsStore.selectedVehiclePlateNumber
    : settingsStore.selectedVehicleName

  await refuelStore.readRefuels(settingsStore.selectedVehicleId ?? 0)
  vehicle.value =
    (await refuelStore.getVehicle(settingsStore.selectedVehicleId ?? 0)) ??
    vehicle.value

  // Define to which index to scroll
  if (props.id && props.id > 0)
    scrollToIndex.value = refuelStore.refuels
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .findIndex(r => r.id == props.id)

  if (scrollToIndex.value < 0) scrollToIndex.value = 0

  loading.value = false

  if (virtualListRef.value)
    (virtualListRef.value as QVirtualScroll).scrollTo(scrollToIndex.value)
})

onUnmounted(() => {
  emitter.off('showRefuelOptionsDialog')
})
</script>
