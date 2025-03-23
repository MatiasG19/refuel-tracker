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
          @click="toggleLeftDrawer"
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
            :disable="
              !settingsStore.selectedVehicleId ||
              mainLayoutStore.addButton.disabled
            "
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
import { useSettingsStore } from 'src/pages/settings/stores'
import { useMainLayoutStore } from 'src/layouts/stores'
import { Keyboard } from '@capacitor/keyboard'
import { Platform } from 'quasar'
import { useI18n } from 'vue-i18n'

const settingsStore = useSettingsStore()
const mainLayoutStore = useMainLayoutStore()
const { t } = useI18n()

const linkList = ref([
  {
    title: computed(() => `${t('drawer.dashboardPage')}`),
    caption: '',
    icon: 'bar_chart',
    link: '/'
  },
  {
    title: computed(() => `${t('drawer.vehiclesPage')}`),
    caption: '',
    icon: 'drive_eta',
    link: '/vehicles'
  },
  {
    title: computed(() => `${t('drawer.refuelsPage')}`),
    caption: '',
    icon: 'local_gas_station',
    link: '/vehicles/refuels'
  },
  {
    title: computed(() => `${t('drawer.settingsPage')}`),
    caption: '',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: computed(() => `${t('drawer.supportPage')}`),
    caption: '',
    icon: 'favorite_outline',
    link: '/support'
  }
])

const footerVisible = ref(true)
const leftDrawerOpen = ref(false)

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

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
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
})

onUnmounted(() => {
  removeEventListener('resize', calculateAreaHeight)
})
</script>
