<template>
  <q-page>
    <div
      v-if="
        refuelStore.vehicle &&
        !refuels.length &&
        !refuelFilterStore.filter.active &&
        refuelFilterStore.filter.type == FilterType.All
      "
      class="column items-center absolute-center"
    >
      <q-icon name="local_gas_station" size="100px" color="accent" />
      <q-btn
        color="accent"
        :label="i18n.global.t('placeholders.addRefuel')"
        icon-right="add"
        unelevated
        no-caps
        outline
        @click="router.push(`/vehicles/refuels/add`)"
      />
    </div>
    <div
      v-else-if="!refuelStore.vehicle"
      class="column items-center absolute-center"
    >
      <q-icon name="local_gas_station" size="100px" color="accent" />
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
          v-if="item && item.type === 'refuel'"
          :key="index"
          :refuel="item.value"
          :vehicle="refuelStore.vehicle!"
          :fuelConsumption="
            vehicleFuelConsumption(
              toRaw(refuelStore.vehicle!),
              toRaw(item.value)
            ).toFixedIfNotZero(2)
          "
          :loading="loading"
          class="q-pt-md q-pl-md q-pr-md"
          @on-options-click="
            payload => optionsDialog(refuelDialogOptions, payload)
          "
        />
        <expense-card
          v-if="item && item.type === 'expense'"
          :key="index"
          :expense="item.value"
          :vehicle="refuelStore.vehicle!"
          :loading="loading"
          class="q-pt-md q-pl-md q-pr-md"
          @on-options-click="
            payload => optionsDialog(expenseDialogOptions, payload)
          "
        />
      </q-virtual-scroll>

      <Teleport to="#header-badges-left">
        <div
          v-if="refuelFilterStore.filter.active"
          class="q-pl-md cursor-pointer"
        >
          <q-badge
            color="negative"
            dense
            @click="refuelFilterStore.removeDateFilter()"
            >{{ refuelFilterStore.dateFilterName }}
            <q-icon name="cancel" class="q-ml-xs" />
          </q-badge>
        </div>
        <div
          v-if="refuelFilterStore.filter.type > FilterType.All"
          class="q-pl-md cursor-pointer"
        >
          <q-badge
            color="negative"
            dense
            @click="refuelFilterStore.removeTypeFilter()"
          >
            {{
              refuelFilterStore.filterTypeOptions.find(
                o => o.value == refuelFilterStore.filter.type
              )?.label
            }}
            <q-icon name="cancel" class="q-ml-xs" />
          </q-badge>
        </div>
      </Teleport>
    </template>
    <Teleport to="#header-badges-left" v-if="refuelStore.vehicle">
      <div class="q-pl-md cursor-pointer">
        <q-badge
          class="space-station"
          @click="
            selectDialog(
              refuelStore.vehicle!.id,
              t('refuels.selectVehicle'),
              vehicleOptions,
              (id: number) => {
                refuelStore.readData(id)
              }
            )
          "
          >{{ refuelStore.vehicle?.name }}
          <q-icon name="arrow_drop_down" class="q-ml-xs"
        /></q-badge>
      </div>
    </Teleport>
  </q-page>
</template>

<script setup lang="ts">
import RefuelCard from 'src/pages/refuels/components/RefuelCard.vue'
import ExpenseCard from 'src/pages/refuels/components/ExpenseCard.vue'
import {
  computed,
  ref,
  onUnmounted,
  onBeforeMount,
  toRaw,
  onMounted
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  OptionInDialog,
  optionsDialog
} from 'src/components/dialogs/optionsDialog'
import { confirmDialog } from 'src/components/dialogs/confirmDialog'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { Vehicle } from 'src/scripts/libraries/refuel/models'
import { vehicleFuelConsumption } from 'src/scripts/libraries/refuel/functions/vehicle'
import { QVirtualScroll } from 'quasar'
import { useRefuelStore, useRefuelFilterStore } from './stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import { useI18n } from 'vue-i18n'
import { i18n } from 'src/boot/i18n'
import messages from './i18n'
import { vehicleRepository } from 'src/scripts/databaseRepositories'
import { selectDialog } from 'src/components/dialogs/selectDialog'
import { SelectOption } from 'src/components/inputs/types'
import { ExpenseViewModel } from './models'
import { FilterType } from 'src/scripts/libraries/refuel/models'

const props = defineProps({
  refuelId: {
    type: String
  }
})

const router = useRouter()
const route = useRoute()
const settingsStore = useSettingsStore()
const refuelStore = useRefuelStore()
const refuelFilterStore = useRefuelFilterStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n({ useScope: 'local', messages })

const loading = ref(true)
const virtualListRef = ref(null)
const areaHeight = computed(() => `height: ${settingsStore.areaHeight}px`)
const scrollToIndex = ref(0)
const vehicles = ref<Vehicle[]>([])
const vehicleOptions = ref<SelectOption[]>([])
const refuelDialogOptions = ref<OptionInDialog[]>([
  {
    text: t('refuels.optionsDialog.edit'),
    icon: 'edit',
    action: (data: unknown) =>
      router.push({ path: `/vehicles/refuels/${data}/edit` })
  },
  {
    text: t('refuels.optionsDialog.delete'),
    icon: 'delete',
    action: (data: unknown) =>
      confirmDialog(
        t('refuels.optionsDialog.deleteRefuel'),
        (data: unknown) => {
          ;(async () => {
            await refuelStore.deleteRefuel(data as number)
            await refuelStore.readData(refuelStore.vehicle!.id)
          })()
        },
        data
      )
  }
])

const expenseDialogOptions = ref<OptionInDialog[]>([
  {
    text: t('refuels.optionsDialog.edit'),
    icon: 'edit',
    action: (data: unknown) =>
      router.push({ path: `/vehicles/refuels/${data}/editExpense` })
  },
  {
    text: t('refuels.optionsDialog.delete'),
    icon: 'delete',
    action: (data: unknown) =>
      confirmDialog(
        t('refuels.optionsDialog.deleteRefuel'),
        (data: unknown) => {
          ;(async () => {
            await refuelStore.deleteExpense(data as number)
            await refuelStore.readData(refuelStore.vehicle!.id)
          })()
        },
        data
      )
  }
])

const refuels = computed<ExpenseViewModel[]>(() => {
  let items = [...(refuelStore.vehicle?.allExpenses ?? [])]
  if (refuelFilterStore.filter.type > FilterType.All) {
    switch (refuelFilterStore.filter.type) {
      case FilterType.Refuels:
        items = items.filter(r => r.type == 'refuel')
        break
      case FilterType.Expenses:
        items = items.filter(r => r.type == 'expense')
        break
    }
  }
  if (refuelFilterStore.filter.active) {
    items = items.filter(
      r =>
        r.value.date.getTime() >= refuelFilterStore.filter.dateFrom.getTime() &&
        r.value.date.getTime() <= refuelFilterStore.filter.dateUntil.getTime()
    )
  }

  return items.sort((a, b) => b.value.date.getTime() - a.value.date.getTime())
})

function getRefuels(from: number, size: number): Array<ExpenseViewModel> {
  const items: Array<ExpenseViewModel> = []
  for (let i = 0; i < size; i++) {
    items.push(refuels.value[from + i]!)
  }
  return items
}

onBeforeMount(async () => {
  mainLayoutStore.titleText = t('refuels.title')
  await refuelStore.readData(parseInt(route.params.vehicleId as string))

  // Define to which index to scroll
  if (props.refuelId && route.query.type) {
    const id = parseInt(props.refuelId)
    if (id)
      scrollToIndex.value = refuelStore
        .vehicle!.allExpenses!.sort(
          (a, b) => b.value.date.getTime() - a.value.date.getTime()
        )
        .findIndex(r => r.type === route.query.type && r.value.id == id)
  }

  if (scrollToIndex.value < 0) scrollToIndex.value = 0

  loading.value = false

  if (virtualListRef.value)
    (virtualListRef.value as QVirtualScroll).scrollTo(scrollToIndex.value)
})

onMounted(async () => {
  mainLayoutStore.showButton(
    mainLayoutStore.headerButton,
    () =>
      void router.push(`/vehicles/${refuelStore.vehicle?.id}/refuels/filter`),
    'filter_list'
  )
  mainLayoutStore.calculateAreaHeight()

  vehicles.value = await vehicleRepository.getVehicles()
  vehicleOptions.value = vehicles.value.map(v => ({
    label: v.name,
    value: v.id
  }))
})

onUnmounted(() => {
  mainLayoutStore.hideButton(mainLayoutStore.headerButton)
})
</script>
