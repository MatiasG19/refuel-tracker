<template>
  <q-input
    outlined
    color="accent"
    :model-value="value"
    @update="$emit('value', $event)"
    :label="label"
    :rules="rules"
  >
    <slot></slot>
  </q-input>
</template>

<script setup lang="ts">
defineProps({
  value: {
    type: String,
    reqired: true
  },
  label: {
    type: String,
    default: 'Input'
  },
  rules: {
    type: null
  }
})

defineEmits(['value'])
</script>
