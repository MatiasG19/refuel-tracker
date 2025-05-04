<template>
  <q-input
    outlined
    color="accent"
    :model-value="value"
    @update="$emit('value', $event)"
    :label="label"
    :rules="rules"
    :type="type"
    :dark="settingsStore.dark"
    popup-content-class="bg-space-station"
    label-color="secondary"
  >
    <slot></slot>
  </q-input>
</template>

<script setup lang="ts">
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'

const settingsStore = useSettingsStore()

defineProps({
  type: {
    type: null,
    default: 'text'
  },
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Input'
  },
  rules: {
    type: null
  }
})

defineEmits(['value'])
</script>
