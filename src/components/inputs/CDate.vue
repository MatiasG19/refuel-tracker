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
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        no-unset
      >
        <div class="row items-center justify-end">
          <q-btn
            v-close-popup
            color="secondary"
            flat
            :label="t('components.inputs.ok')"
          />
        </div>
      </q-date>
    </q-popup-proxy>
  </c-input>
</template>

<script setup lang="ts">
import CInput from 'src/components/inputs/CInput.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  modelValue: {
    type: String,
    reqired: false
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
