<template>
  <div class="q-mt-none row">
    <q-btn
      v-for="(option, index) in props.options"
      :key="option.value"
      @click="emits('update:modelValue', option)"
      :ripple="false"
      :class="{
        col: true,
        'q-ml-sm ': index > 0
      }"
      :color="getButtonColor(option.value)"
      :text-color="getButtonColor(option.value, true)"
      no-caps
      >{{ option.label }}</q-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import { SelectOption } from './types'

const props = defineProps<{
  modelValue: SelectOption
  options: SelectOption[]
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', modelValue: SelectOption): void
}>()

const settingsStore = useSettingsStore()

function getButtonColor(value: number, text?: boolean) {
  let color = props.modelValue.value == value ? 'primary' : 'secondary'
  if (settingsStore.dark) {
    if (color == 'primary') color = 'secondary'
    else if (color == 'secondary') color = 'primary'
  }

  if (text) {
    if (color == 'primary') color = 'secondary'
    else if (color == 'secondary') color = 'primary'
  }
  return color
}
</script>
