<template>
  <q-layout view="lHh Lpr lFf" class="bg-space-station">
    <q-header id="header" class="bg-space-station">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          {{ mainLayoutStore.titleText }}
        </q-toolbar-title>

        <q-btn
          v-if="mainLayoutStore.headerButton.visible"
          @click="mainLayoutStore.headerButton.action()"
          :icon="mainLayoutStore.headerButton.icon"
          :color="mainLayoutStore.headerButton.color"
          :disable="mainLayoutStore.headerButton.disabled"
          round
          flat
          dense
        />
      </q-toolbar>

      <div id="header-badges-left" class="row q-gutter-xs"></div>
      <div class="column items-center">
        <div id="header-badges-center" class="row q-gutter-xs q-pb-xs"></div>
      </div>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="space-station"
    >
      <q-list>
        <q-item-label header
          ><span class="space-station">Refuel Tracker</span></q-item-label
        >

        <EssentialLink
          v-for="link in linkList"
          :key="link.title"
          v-bind="link"
          class="space-station"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="fadein">
          <component :is="Component" :key="$route.path" />
        </transition>
      </router-view>
    </q-page-container>

    <q-footer v-if="footerVisible" class="bg-space-station" id="footer">
      <q-toolbar class="q-gutter-xs text-center">
        <div class="col">
          <q-btn round flat dense icon="bar_chart" class="col" :to="'/'" />
        </div>
        <div class="col">
          <q-btn
            round
            flat
            dense
            icon="add"
            class="col"
            @click="mainLayoutStore.addButton.action()"
            :disable="mainLayoutStore.addButton.disabled"
          />
        </div>
        <div class="col">
          <q-btn
            round
            flat
            dense
            icon="drive_eta"
            class="col"
            :to="'/vehicles'"
          />
        </div>
        <div class="col">
          <q-btn
            round
            flat
            dense
            icon="local_gas_station"
            class="col"
            :to="'/vehicles/refuels'"
          />
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { useMainLayoutStore } from 'src/layouts/stores/mainLayoutStore'
import { Keyboard } from '@capacitor/keyboard'
import { Platform } from 'quasar'
import { useI18n } from 'vue-i18n'
import messages from './i18n'
import {
  OptionInDialog,
  optionsDialog
} from 'src/components/dialogs/optionsDialog'
import { useRouter } from 'vue-router'

const router = useRouter()
const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n()
const { t: lt } = useI18n({ useScope: 'local', messages })

const footerVisible = ref(true)
const leftDrawerOpen = ref(false)

const linkList = computed(() => [
  {
    title: t('drawer.dashboardPage'),
    caption: '',
    icon: 'bar_chart',
    link: '/'
  },
  {
    title: t('drawer.vehiclesPage'),
    caption: '',
    icon: 'drive_eta',
    link: '/vehicles'
  },
  {
    title: t('drawer.refuelsPage'),
    caption: '',
    icon: 'local_gas_station',
    link: '/vehicles/refuels'
  },
  {
    title: t('drawer.settingsPage'),
    caption: '',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: t('drawer.supportPage'),
    caption: '',
    icon: 'favorite_outline',
    link: '/support'
  }
])

const addButtonDialogOptions = computed<OptionInDialog[]>(() => [
  {
    text: lt('addDialog.vehicle'),
    icon: 'drive_eta',
    action: () => router.push({ path: `/vehicles/add` })
  },
  {
    text: lt('addDialog.expense'),
    icon: 'attach_money',
    action: () => router.push({ path: `/vehicles/refuels/addExpense` })
  },
  {
    text: lt('addDialog.refuel'),
    icon: 'local_gas_station',
    action: () => router.push({ path: `/vehicles/refuels/add` })
  }
])

async function addKeyboardListeners() {
  if (Platform.is.mobile) {
    await Keyboard.addListener('keyboardDidShow', () => {
      footerVisible.value = false
    })

    await Keyboard.addListener('keyboardDidHide', () => {
      footerVisible.value = true
    })

    await Keyboard.addListener('keyboardDidHide', () => {
      calculateAreaHeight()
    })
  }
}

function calculateAreaHeight() {
  const header = document.getElementById('header')
  const footer = document.getElementById('footer')
  if (header && footer)
    settingsStore.areaHeight =
      document.documentElement.clientHeight -
      header.getBoundingClientRect().height -
      footer.getBoundingClientRect().height
}

onMounted(async () => {
  if (Platform.is.mobile) {
    await addKeyboardListeners()
  }

  addEventListener('resize', () => {
    calculateAreaHeight()
  })
  calculateAreaHeight()
  mainLayoutStore.calculateAreaHeight = calculateAreaHeight

  mainLayoutStore.addButton.action = () =>
    optionsDialog(addButtonDialogOptions.value)
})

onUnmounted(() => {
  removeEventListener('resize', calculateAreaHeight)
})
</script>
