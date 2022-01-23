<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <q-input standout="bg-teal text-white" v-model="vehicleName" label="Vehicle name" />
      <q-input standout="bg-teal text-white" v-model="plateNumber" label="Plate number" />
      <q-select class="q-pb-md" standout="bg-teal text-white" v-model="fuelUnit"
          :options="fuelUnits" label="Fuel unit" map-options emit-value/>

    <div class="q-gutter-sm">
      <q-btn color="negative" label="Cancel" no-caps @click="$router.go(-1)" />
      <q-btn color="positive" label="Confirm" type="submit" no-caps />
    </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const vehicleName = ref('')
const plateNumber = ref('')
const fuelUnit = ref(0)

const fuelUnits = [
  {
    label: 'L/100km',
    value: 0
  },
  {
    label: 'MPG US',
    value: 1
  },
  {
    label: 'MPG Imperial',
    value: 2
  },
  {
    label: 'kWh/100km',
    value: 3
  },
  {
    label: 'Wh/km',
    value: 4
  }
]

function onSubmit(evt?: SubmitEvent) {
  console.log(fuelUnit.value)
  //void router.go(-1)
}

</script>
