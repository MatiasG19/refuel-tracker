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

<style>
/* Remove spinners in webkit browsers (Chrome, Safari) */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Remove spinners in Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
