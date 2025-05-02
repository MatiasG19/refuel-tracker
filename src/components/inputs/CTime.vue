<template>
  <c-input
    color="accent"
    :value="modelValue"
    :label="label"
    :rules="rules"
    @mousedown.prevent
  >
    <q-popup-proxy transition-show="scale" transition-hide="scale">
      <q-time
        text-color="secondary"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        format24h
      >
        <div class="row items-center justify-end">
          <q-btn
            v-close-popup
            color="secondary"
            flat
            :label="t[settingsStore.locale]['components']['inputs']['ok']"
          /></div
      ></q-time>
    </q-popup-proxy>
  </c-input>
</template>

<script setup lang="ts">
import CInput from 'src/components/inputs/CInput.vue'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'
import t from 'src/i18n'

const settingsStore = useSettingsStore()

defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Date'
  },
  rules: {
    type: null
  },
  format24h: {
    type: Boolean
  }
})

defineEmits(['update:modelValue'])
</script>
