<template>
  <q-item clickable :to="link" v-ripple>
    <q-item-section
      v-if="icon"
      avatar
      :class="
        link === $route.fullPath ? 'accent-space-station' : 'space-station'
      "
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section
      c
      :class="
        link === $route.fullPath ? 'accent-space-station' : 'space-station'
      "
    >
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption> {{ caption }} </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>
