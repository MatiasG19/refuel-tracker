<template>
  <q-page class="items-center">
    <Transition name="fade">
      <div v-if="editOrder" class="text-center">
        <q-btn
          class="q-pa-xs btn"
          dense
          color="accent"
          :label="t('graphData.saveOrder')"
          no-caps
          unelevated
          @click="saveOrder"
        />
      </div>
    </Transition>

    <div
      v-if="vehiclesExits && graphData.length === 0"
      class="absolute-center items-center"
    >
      <div class="row">
        <q-icon class="col" name="img:bar_chart.svg" size="100px" />
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
    <div v-else-if="!vehiclesExits" class="absolute-center">
      <div class="row">
        <q-icon class="col" name="img:bar_chart.svg" size="100px" />
      </div>
      <q-btn
        class="row"
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
      <template v-if="loading">
        <q-spinner
          class="absolute-center"
          color="primary"
          size="3em"
          :thickness="10"
        />
      </template>
      <template v-else>
        <Container
          @drop="onDrop"
          lock-axis="y"
          auto-scroll-enabled="true"
          drag-handle-selector=".draggable"
        >
          <Draggable v-for="data in graphData" :key="data.uid">
            <div :class="{ draggable: editOrder }">
              <graph-card
                class="q-pt-md q-pl-md q-pr-md"
                :graphData="data"
                :periods="periods"
                :shake-animation="editOrder"
              />
            </div>
          </Draggable>
        </Container>
      </template>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import GraphCard from 'src/pages/graphData/components/GraphCard.vue'
import {
  ref,
  watchEffect,
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted
} from 'vue'
import { emitter } from 'src/boot/mitt'
import packageJson from '../../../package.json'
import { useRefuelStore } from 'src/stores/refuelStore'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useGraphDataStore } from './stores/graphDataStore'
import { Period } from 'src/pages/graphData/scripts/models'
import { optionsDialog } from 'src/components/dialogs/optionsDialog'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import messages from './i18n'
import { Container, Draggable, DropResult } from 'vue3-smooth-dnd'
import { App } from '@capacitor/app'

const $q = useQuasar()
$q.dark.set('auto')

const router = useRouter()
const refuelStore = useRefuelStore()
const graphDataStore = useGraphDataStore()
const settingsStore = useSettingsStore()
const { t } = useI18n({ useScope: 'local', messages })

const loading = ref(false)
const editOrder = ref(false)
const periods = ref<Period[]>([])
const graphData = computed(() => graphDataStore.graphData)
const vehiclesExits = computed(() => settingsStore.selectedVehicleId)
const optionsInDialog = ref([
  {
    text: computed(() => `${t('graphData.optionsInDialog.move')}`),
    icon: 'swap_vert',
    action: () => (editOrder.value = true)
  }
])

function saveOrder() {
  editOrder.value = false
  graphDataStore.saveCardOrder()
}

watchEffect(() => {
  // Emit inside watchEffect to catch window reloads
  emitter.emit(
    'updateTitle',
    (() => {
      if (!settingsStore.selectedVehicleId) return packageJson.productName
      else if (settingsStore.plateNumberInTitleActive)
        return settingsStore.selectedVehiclePlateNumber
      return settingsStore.selectedVehicleName
    })()
  )
})

function onDrop(dropResult: DropResult) {
  graphDataStore.moveCard(dropResult)
}

onBeforeMount(async () => {
  periods.value = await refuelStore.getPeriods()
})

onMounted(() => {
  graphDataStore.readGraphData()
  App.addListener('backButton', () => (editOrder.value = false))

  emitter.on('showGraphOptionsDialog', payload =>
    optionsDialog(optionsInDialog.value, payload)
  )

  emitter.on('selectedVehicleChanged', () =>
    (() => {
      graphDataStore
        .readGraphData()
        .then(() => setTimeout(() => (loading.value = false), 100))
      loading.value = false
    })()
  )
})

onUnmounted(() => {
  emitter.off('showGraphOptionsDialog')
  emitter.off('selectedVehicleChanged')
})
</script>

<style scoped>
.btn {
  width: 40%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}
</style>
