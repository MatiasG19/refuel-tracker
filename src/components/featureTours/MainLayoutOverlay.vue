<template>
  <div class="overlay"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.overlay {
  position: absolute;
  z-index: 10000;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
