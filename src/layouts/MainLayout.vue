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
          v-for="link in essentialLinks"
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
          <q-btn round flat dense icon="bar_chart" class="col"/>
        </div>
        <div class="col">
          <q-btn round flat dense icon="add" class="col"/>
        </div>
        <div class="col">
          <q-btn round flat dense icon="drive_eta" class="col"/>
        </div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Graphs',
    caption: '',
    icon: 'bar_chart',
    link: ''
  },
  {
    title: 'Vehicles',
    caption: '',
    icon: 'drive_eta',
    link: ''
  },
  {
    title: 'Refuels',
    caption: '',
    icon: 'local_gas_station',
    link: ''
  },
  {
    title: 'Settings',
    caption: '',
    icon: 'settings',
    link: ''
  },
  {
    title: 'Help and Support',
    caption: '',
    icon: 'favorite_outline',
    link: 'https://github.com/matiasg19/refuel-tracker'
  }
];

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
