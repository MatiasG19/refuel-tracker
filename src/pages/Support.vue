<template>
  <div class="q-pa-md q-gutter-md">

  </div>
</template>

<script setup lang="ts">
import { emit } from 'process'
import { onMounted, computed, defineEmits } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const routePath = computed(() => router.currentRoute.value.path)

const emits = defineEmits([
  'update:title'
])

onMounted(() => {
  console.log('Test')
  emits('update:title', routePath.value)
})
</script>
