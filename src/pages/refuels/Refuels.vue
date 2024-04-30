<template>
  <q-page>
    <div
      v-if="
        vehiclesExists &&
        refuels.length === 0 &&
        !refuelFilterStore.filter?.active
      "
      class="absolute-center items-center"
    >
      <div class="row">
        <q-icon class="col" name="img:local_gas_station.svg" size="100px" />
      </div>
      <q-btn
        color="accent"
        :label="i18n.global.t('placeholders.addRefuel')"
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
        :label="i18n.global.t('placeholders.addVehicle')"
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
        v-if="vehiclesExists && refuelFilterStore.filter?.active"
        class="q-pt-md text-center"
      >
        <q-btn
          class="q-pa-xs"
          style="color: pink"
          flat
          no-caps
          label=" "
          @click="refuelFilterStore.removeFilter()"
          icon-right="delete_outline"
          >{{ refuelFilterStore.filter?.title }}</q-btn
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
          :vehicle="refuelStore.vehicle"
          :fuelConsumption="
            vehicleFuelConsumption(
              toRaw(refuelStore.vehicle),
              toRaw(item)
            ).toFixed(2)
          "
          :loading="loading"
          class="q-pt-md q-pl-md q-pr-md"
        />
      </q-virtual-scroll>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/pages/refuels/components/RefuelCard.vue'
import { computed, ref, onUnmounted, onBeforeMount, toRaw } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { Refuel } from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { QVirtualScroll } from 'quasar'
import { useRefuelStore, useRefuelFilterStore } from './stores'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'

const router = useRouter()
const settingsStore = useSettingsStore()
const refuelStore = useRefuelStore()
const refuelFilterStore = useRefuelFilterStore()
const { t } = useI18n({ useScope: 'local', messages })

const vehiclesExists = settingsStore.selectedVehicleId
const vehicleName = ref<string>('')
const loading = ref(true)
const virtualListRef = ref(null)
let scrollToIndex = ref(0)

const props = defineProps({
  id: {
    type: String
  }
})

let refuels = computed(() => {
  let items = []
  if (refuelFilterStore.filter && refuelFilterStore.filter.active) {
    items = [...(refuelStore.vehicle?.refuels ?? [])]
      .filter(
        r =>
          r.date.getTime() >= refuelFilterStore.filter!.dateFrom.getTime() &&
          r.date.getTime() <= refuelFilterStore.filter!.dateUntil.getTime()
      )
      .sort((a, b) => b.date.getTime() - a.date.getTime())
  } else
    items = [...(refuelStore.vehicle?.refuels ?? [])].sort(
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
                .then(async () => await refuelStore.readData()))()
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

  await refuelStore.readData()

  // Define to which index to scroll
  if (props.id) {
    const id = parseInt(props.id)
    if (id)
      scrollToIndex.value = refuelStore.vehicle
        .refuels!.sort((a, b) => b.date.getTime() - a.date.getTime())
        .findIndex(r => r.id == id)
  }

  if (scrollToIndex.value < 0) scrollToIndex.value = 0

  loading.value = false

  if (virtualListRef.value)
    (virtualListRef.value as QVirtualScroll).scrollTo(scrollToIndex.value)
})

onUnmounted(() => {
  emitter.off('showRefuelOptionsDialog')
})
</script>
