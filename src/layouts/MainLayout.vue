<template>
  <q-layout view="lHh Lpr lFf" class="bg-space-station">
    <q-header ref="header">
      <q-toolbar class="bg-space-station">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ title }}
        </q-toolbar-title>

        <q-btn
          v-if="saveButtonVisible"
          class="q-pt-xs q-pl-md q-mt-md q-mr-xs"
          color="accent"
          label=""
          icon="save"
          no-caps
          unelevated
          @click="emitter.emit('save', true)"
        />

        <q-btn
          v-if="
            routePath == '/refuels' || routePath.match('\/refuels\/[-0-9]+')
          "
          :to="'/refuels/filter'"
          icon="filter_list"
          round
          flat
          dense
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="space-station"
    >
      <q-list>
        <q-item-label header class="space-station">
          Refuel Tracker
        </q-item-label>

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

    <q-footer v-if="footerVisible" class="bg-space-station" ref="footer">
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
            @click="add()"
            :disable="
              !settingsStore.selectedVehicleId &&
              !routePath.includes('/vehicles')
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
            :to="'/refuels'"
          />
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { useSettingsStore } from 'src/stores/settingsStore'
import { Keyboard } from '@capacitor/keyboard'
import { Platform } from 'quasar'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const settingsStore = useSettingsStore()
const routePath = computed(() => router.currentRoute.value.path)
const { t } = useI18n()
const header = ref()
const footer = ref()

const linkList = ref([
  {
    title: computed(() => `${t('drawer.graphPage')}`),
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
    link: '/refuels'
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
const saveButtonVisible = ref(false)
const leftDrawerOpen = ref(false)
const title = ref('')

function addKeyboardListeners() {
  if (Platform.is.mobile) {
    Keyboard.addListener('keyboardDidShow', () => {
      footerVisible.value = false
    })

    Keyboard.addListener('keyboardDidHide', () => {
      footerVisible.value = true
    })
  }
}

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function add() {
  if (routePath.value.includes('/add') || routePath.value.includes('/edit'))
    return
  else if (routePath.value == '/vehicles') void router.push('/vehicles/add')
  else void router.push('/refuels/add')
}

function calculateAreaHeight() {
  settingsStore.areaHeight =
    document.documentElement.clientHeight -
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    header.value.heightHint -
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    footer.value.heightHint
}

onMounted(() => {
  if (Platform.is.mobile) {
    addKeyboardListeners()
  }

  emitter.on('updateTitle', e => (title.value = e))
  emitter.on('showSaveButton', e => (saveButtonVisible.value = e))

  addEventListener('resize', () => {
    calculateAreaHeight()
  })
  calculateAreaHeight()
})

onUnmounted(() => {
  emitter.off('updateTitle')
  emitter.off('showSaveButton')
  removeEventListener('resize', calculateAreaHeight)
})
</script>
