<template>
  <c-input color="accent" :value="value" :label="label" :rules="rules">
    <q-popup-proxy transition-show="scale" transition-hide="scale">
      <q-date :modelValue="value" @update:modelValue="$emit('value', $event)" />
    </q-popup-proxy>
  </c-input>
</template>

<script setup lang="ts">
import CInput from 'src/components/inputs/CInput.vue'

defineProps({
  value: {
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

defineEmits(['value'])
</script>
