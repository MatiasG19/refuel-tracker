<template>
  <c-input
    color="accent"
    :value="modelValue"
    :label="label"
    :rules="rules"
    @mousedown.prevent
  >
    <q-popup-proxy transition-show="scale" transition-hide="scale">
      <q-date
        text-color="secondary"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        no-unset
      >
        <div class="row items-center justify-end">
          <q-btn
            v-close-popup
            color="secondary"
            flat
            :label="t[settingsStore.locale]['components']['inputs']['ok']"
          />
        </div>
      </q-date>
    </q-popup-proxy>
  </c-input>
</template>

<script setup lang="ts">
import CInput from 'src/components/inputs/CInput.vue'
import t from 'src/i18n'
import { useSettingsStore } from 'src/pages/settings/stores/settingsStore'

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
  }
})

defineEmits(['update:modelValue'])
</script>
