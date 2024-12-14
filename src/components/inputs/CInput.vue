<template>
  <q-input
    outlined
    color="accent"
    :model-value="value"
    @update="$emit('value', $event)"
    :label="label"
    :rules="rules"
    :type="type"
    :dark="true"
    popup-content-class="bg-space-station"
    label-color="secondary"
  >
    <slot></slot>
  </q-input>
</template>

<script setup lang="ts">
defineProps({
  type: {
    type: null,
    default: 'text'
  },
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
