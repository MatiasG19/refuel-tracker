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
          <q-btn round flat dense icon="bar_chart" class="col" :to="'/'" />
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

import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { productName } from '../../package.json'

const router = useRouter()
const routePath = computed(() => router.currentRoute.value.path)

const leftDrawerOpen = ref(false)
const title = ref(productName)
let showPlateNumber = false

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

watchEffect(() => {
  if(routePath.value == '/' && !showPlateNumber)
    title.value = 'My Car Name'
  else if(routePath.value == '/' && !showPlateNumber)
    title.value = 'HH:TT2022'
  else if(routePath.value == '/vehicles')
    title.value = 'Vehicles'
  else if(routePath.value == '/vehicles/add')
    title.value = 'Add vehicle'
  else if(routePath.value == '/vehicles/edit')
    title.value = 'Edit vehicle'
  else if(routePath.value == '/refuels')
    title.value = 'Refuels'
  else if(routePath.value == '/refuels/add')
    title.value = 'Add refuel'
  else if(routePath.value == '/refuels/edit')
    title.value = 'Add refuel'
  else if(routePath.value == '/refuels/filter')
    title.value = 'Filter refuels'
  else if(routePath.value == '/settings')
    title.value = 'Settings'
  else if(routePath.value == '/support')
    title.value = 'Support'
  else
    title.value = productName
})

</script>
