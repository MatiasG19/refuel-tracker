<template>
  <q-checkbox v-model="model" color="secondary" />
</template>

<script setup lang="ts">
const model = defineModel({ required: true })
</script>
