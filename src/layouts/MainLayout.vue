<template>
  <q-layout view="lHh Lpr lFf" class="bg-space-station">
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
          v-if="routePath == '/refuels'"
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
        <q-item-label
          header
          class="space-station"
        >
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
      <router-view />
    </q-page-container>

    <q-footer class="bg-space-station">
      <q-toolbar class="q-gutter-xs text-center">
        <div class="col">
          <q-btn round flat dense icon="bar_chart" class="col" :to="'/'"/>
        </div>
        <div class="col">
          <q-btn round flat dense icon="add" class="col" @click="add()"/>
        </div>
        <div class="col">
          <q-btn round flat dense icon="drive_eta" class="col" :to="'/vehicles'"/>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

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
];

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { emitter } from 'src/boot/mitt'

const router = useRouter()
const routePath = computed(() => router.currentRoute.value.path)
emitter.on('updateTitle', (e) => title.value = e)

const leftDrawerOpen = ref(false)
const title = ref('')

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function add() {
  if(routePath.value == '/vehicles')
    void router.push('/vehicles/add')
  else if(routePath.value.includes('form'))
    return
  else
    void router.push('/refuels/add')
}

</script>
