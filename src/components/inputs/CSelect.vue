<template>
  <q-select
    outlined
    color="accent"
    :model-value="value"
    @input="$emit('value', $event)"
    :options="options"
    :label="label"
    map-options
    emit-value
    :dark="true"
    popup-content-class="bg-space-station"
  >
    <slot></slot>
  </q-select>
</template>

<script setup lang="ts">
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

defineEmits(['value'])
</script>
