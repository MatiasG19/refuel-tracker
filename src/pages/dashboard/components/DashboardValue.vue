<template>
  <div>
    <div class="text-subtitle2 no-break">{{ title }}</div>
    <div class="row">
      <div class="col text-h6 accent-space-station">
        {{ value }}
      </div>
    </div>
    <div class="text-subtitle3">{{ subtitle }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.no-break {
  white-space: nowrap;
}
</style>
