<template>
  <q-page class="items-center">
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
                @on-long-press="editOrderFun()"
                @on-options-click="
                  payload => optionsDialog(optionsInDialog, payload)
                "
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
import { ref, computed, onBeforeMount, onMounted, onUnmounted } from 'vue'
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
    action: () => editOrderFun()
  }
])

function editOrderFun() {
  editOrder.value = true
  emitter.emit('showSaveButton', true)
  emitter.on('save', () => saveOrder())
}

function saveOrder() {
  editOrder.value = false
  graphDataStore.saveCardOrder()
  emitter.off('save')
  emitter.emit('showSaveButton', false)
}

function updateTitle() {
  emitter.emit(
    'updateTitle',
    (() => {
      if (!settingsStore.selectedVehicleId) return packageJson.productName
      else if (settingsStore.plateNumberInTitleActive)
        return settingsStore.selectedVehiclePlateNumber
      return settingsStore.selectedVehicleName
    })()
  )
}

function onDrop(dropResult: DropResult) {
  graphDataStore.moveCard(dropResult)
}

onBeforeMount(async () => {
  periods.value = await refuelStore.getPeriods()
})

onMounted(() => {
  const timeOut = setTimeout(() => (loading.value = true), 200)
  updateTitle()
  graphDataStore.readGraphData()
  App.addListener('backButton', () => (editOrder.value = false))
  clearTimeout(timeOut)
  loading.value = false
  emitter.on('selectedVehicleChanged', () => {
    updateTitle()
    graphDataStore.readGraphData()
  })
})

onUnmounted(() => {
  emitter.off('selectedVehicleChanged')
  emitter.emit('showSaveButton', false)
  emitter.off('save')
})
</script>
