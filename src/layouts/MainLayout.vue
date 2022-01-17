<template>
  <q-layout view="lHh Lpr lFf" class="bg-space-station">
    <q-header elevated>
      <q-toolbar class="space-station">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="space-station">
          Refuel Tracker
        </q-toolbar-title>

        <q-btn
          v-if="routePath == '/refuel-entries'"
          :to="'filter-refuel-entries-form'"
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

    <q-footer elevated>
      <q-toolbar class="q-gutter-xs text-center">
        <div class="col">
          <q-btn round flat dense icon="bar_chart" class="col" :to="'/'" />
        </div>
        <div class="col">
          <q-btn round flat dense icon="add" class="col" @click="add()"/>
        </div>
        <div class="col">
          <q-btn round flat dense icon="drive_eta" class="col" :to="'vehicle-entries'"/>
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
    link: 'vehicle-entries'
  },
  {
    title: 'Refuels',
    caption: '',
    icon: 'local_gas_station',
    link: 'refuel-entries'
  },
  {
    title: 'Settings',
    caption: '',
    icon: 'settings',
    link: 'settings'
  },
  {
    title: 'Help and Support',
    caption: '',
    icon: 'favorite_outline',
    link: ''
  }
];

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routePath = computed(() => router.currentRoute.value.path)

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}  

function add() {
  if(routePath.value == '/vehicle-entries')
    void router.push('vehicle-form')
  else if(routePath.value.includes('form'))
    return
  else
    void router.push('refuel-form')
}

</script>
