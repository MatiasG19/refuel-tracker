<template>
  <q-select outlined color="accent" :model-value="value" @input="$emit('value', $event)"
    :options="options" :label="label" map-options emit-value>
    <slot></slot>
  </q-select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

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

defineEmits([
  'value'
])
</script>
