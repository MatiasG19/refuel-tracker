<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <q-input standout="bg-teal text-white" v-model="vehicleName" label="Vehicle name" />
      <q-input standout="bg-teal text-white" v-model="plateNumber" label="Plate number" />

    <div class="q-gutter-sm">
      <q-btn color="negative" label="Cancel" no-caps  />
      <q-btn color="positive" label="Confirm" type="submit" no-caps />
    </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let vehicleName = ref<string>('')
let plateNumber = ref<string>('')

function onSubmit(evt?: SubmitEvent) {
  ;
}

</script>
