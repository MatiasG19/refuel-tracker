<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <q-input standout="bg-teal text-white" v-model="payedAmount" label="Payed amount" />
      <q-input standout="bg-teal text-white" v-model="refueledAmount" label="Refuled amount" />

      <q-input standout="bg-teal text-white" v-model="refuelDate" label="Refuel date">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="refuelDate" />
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </q-input> 

      <q-input standout="bg-teal text-white" v-model="refuelTime" label="Refuel time" >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="refuelTime" format24h/>
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>      
      </q-input>

    <div class="q-gutter-sm">
      <q-btn color="negative" label="Cancel" no-caps @click="$router.push('/refuel-entries')" />
      <q-btn color="positive" label="Confirm" type="submit" no-caps />
    </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { date } from 'quasar'

let payedAmount = ref<number>(0.0)
let refueledAmount = ref<number>(0.0)
let refuelDate = ref<string>(date.formatDate(Date.now(), 'YYYY/MM/DD'))
let refuelTime = ref<string>(date.formatDate(Date.now(), 'HH:mm:ss'))

function onSubmit(evt?: SubmitEvent) {
  ;
}

</script>
