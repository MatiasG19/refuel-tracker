<template>
  <q-select
    outlined
    color="accent"
    :model-value="value"
    @input="$emit('value', $event)"
    :options="options"
    :label="label"
    map-options
    emit-value
    :dark="dark"
    popup-content-class="bg-space-station"
    label-color="secondary"
  >
    <slot></slot>
  </q-select>
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
  value: {
    type: String,
    reqired: true
  },
  options: {
    type: Array,
    required: false
  },
  label: {
    type: String,
    default: 'Input'
  }
})

defineEmits(['value'])
</script>
