<template>
  <q-select
    outlined
    color="accent"
    v-model="model"
    :options="options"
    :label="label"
    map-options
    emit-value
    :dark="dark"
    popup-content-class="bg-space-station"
    label-color="secondary"
    @update="emits('update')"
  >
    <slot></slot>
  </q-select>
</template>

<script setup lang="ts">
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { getColorThemes } from 'src/scripts/staticData/colorThemes'
import { computed } from 'vue'
import { SelectOption } from './types'

const settingsStore = useSettingsStore()
const dark = computed(
  () => getColorThemes()[settingsStore.selectedColorThemeId]?.dark
)

const model = defineModel({ required: true })

defineProps({
  options: {
    type: Array<SelectOption>,
    required: false
  },
  label: {
    type: String,
    default: 'Input'
  }
})

const emits = defineEmits(['update'])
</script>
