<template>
  <q-input
    outlined
    color="accent"
    :model-value="value"
    @update="$emit('value', $event)"
    :label="label"
    :rules="rules"
    :type="type"
    :dark="dark"
    popup-content-class="bg-space-station"
    label-color="secondary"
  >
    <slot></slot>
  </q-input>
</template>

<script setup lang="ts">
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { getColorThemes } from 'src/scripts/staticData/colorThemes'
import { computed } from 'vue'

const settingsStore = useSettingsStore()
const dark = computed(
  () => getColorThemes()[settingsStore.selectedColorThemeId].dark
)

defineProps({
  type: {
    type: null,
    default: 'text'
  },
  value: {
    type: String,
    reqired: true
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
