<template>
  <c-input color="accent" :value="modelValue" :label="label" :rules="rules">
    <q-popup-proxy transition-show="scale" transition-hide="scale">
      <q-date
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </q-popup-proxy>
  </c-input>
</template>

<script setup lang="ts">
import CInput from 'src/components/inputs/CInput.vue'

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
