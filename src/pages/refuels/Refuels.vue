<template>
  <q-page>
    <div
      v-if="
        vehiclesExists && !refuels.length && !refuelFilterStore.filter?.active
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
      <q-virtual-scroll
        ref="virtualListRef"
        :style="areaHeight"
        :items-size="refuels.length"
        :items-fn="getRefuels"
        :virtual-scroll-item-size="200"
        virtual-scroll-slice-ratio-before="4"
        virtual-scroll-slice-ratio-after="4"
        v-slot="{ item, index }"
      >
        <refuel-card
          :key="index"
          :refuel="item ? item : new Refuel()"
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

      <Teleport to="#header-badges-left">
        <div class="q-px-md q-pb-xs q-gutter-md">
          <q-badge>{{ settingsStore.getVehicleName() }}</q-badge>
        </div>
      </Teleport>
      <Teleport to="#header-badges-center">
        <div v-if="refuelFilterStore.filter?.active">
          <q-btn
            class="col justify-center q-px-sm"
            color="negative"
            icon="cancel"
            size="md"
            dense
            @click="refuelFilterStore.removeFilter()"
            >{{ refuelFilterStore.filter.title }}
          </q-btn>
        </div>
      </Teleport>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/pages/refuels/components/RefuelCard.vue'
import {
  computed,
  ref,
  onUnmounted,
  onBeforeMount,
  toRaw,
  onMounted,
  watch
} from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { Refuel } from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { QVirtualScroll } from 'quasar'
import { useRefuelStore, useRefuelFilterStore } from './stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'

const router = useRouter()
const settingsStore = useSettingsStore()
const refuelStore = useRefuelStore()
const refuelFilterStore = useRefuelFilterStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

const vehiclesExists = settingsStore.selectedVehicleId
const loading = ref(true)
const virtualListRef = ref(null)
const areaHeight = computed(() => `height: ${settingsStore.areaHeight}px`)
const scrollToIndex = ref(0)

const props = defineProps({
  id: {
    type: String
  }
})

const refuels = computed(() => {
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
            ;(async () => refuelStore.deleteRefuel(id))()
          },
          id
        )
    }
  ])
)

onBeforeMount(async () => {
  mainLayoutStore.titleText = t('refuels.title')
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

watch(
  () => refuelFilterStore.filter?.active,
  () => {
    setTimeout(() => mainLayoutStore.calculateAreaHeight(), 10)
  }
)

onMounted(() => {
  mainLayoutStore.showButton(
    mainLayoutStore.headerButton,
    () => void router.push('/refuels/filter'),
    'filter_list'
  )
  mainLayoutStore.calculateAreaHeight()
})

onUnmounted(() => {
  mainLayoutStore.hideButton(mainLayoutStore.headerButton)
  emitter.off('showRefuelOptionsDialog')
})
</script>
