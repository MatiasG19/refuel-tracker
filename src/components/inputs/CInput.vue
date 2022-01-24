<template>
  <q-input outlined color="accent" :model-value="value" @update="$emit('value', $event)" :label="label">
    <slot></slot>
  </q-input>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps({
  value: {
    type: String,
    reqired: true
  },
  label: {
    type: String,
    default: 'Input'
  }
})

defineEmits([
  'value'
])
</script>
