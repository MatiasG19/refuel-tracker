<template>
  <q-layout view="lHh Lpr lFf" class="bg-space-station">
    <main-layout-overlay></main-layout-overlay>
    <feature-slides v-if="featureSlidesActive"></feature-slides>
    <template v-else>
      <q-header>
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

      <q-footer v-if="footerVisible" class="bg-space-station">
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
    </template>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'
import FeatureSlides from 'src/components/featureTours/FeatureSlides.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'
import { useSettingsStore } from 'src/stores/settingsStore'
import { useFeatureTourStore } from 'src/components/featureTours/stores/featureTourStore'
import { Keyboard } from '@capacitor/keyboard'
import { Platform } from 'quasar'
import MainLayoutOverlay from 'src/components/featureTours/MainLayoutOverlay.vue'

const linkList = [
  {
    title: 'Graphs',
    caption: '',
    icon: 'bar_chart',
    link: '/'
  },
  {
    title: 'Vehicles',
    caption: '',
    icon: 'drive_eta',
    link: '/vehicles'
  },
  {
    title: 'Refuels',
    caption: '',
    icon: 'local_gas_station',
    link: '/refuels'
  },
  {
    title: 'Settings',
    caption: '',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: 'Help and Support',
    caption: '',
    icon: 'favorite_outline',
    link: '/support'
  }
]

const router = useRouter()
const settingsStore = useSettingsStore()
const routePath = computed(() => router.currentRoute.value.path)
const footerVisible = ref(true)
emitter.on('updateTitle', e => (title.value = e))

const leftDrawerOpen = ref(false)
const title = ref('')
const featureSlidesActive = computed(() => featureTourStore.featureSlides)

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

onMounted(() => {
  if (Platform.is.mobile) {
    addKeyboardListeners()
  }
})

onUnmounted(() => {
  emitter.off('updateTitle')
})
</script>
