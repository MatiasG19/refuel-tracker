<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input v-model="payedAmount" label="Payed amount"/>
      <c-input v-model="distanceDriven" label="Distance driven"/>
      <c-input v-model="refueledAmount" label="Refuled amount"/>

      <c-input v-model="refuelDate" label="Refuel date">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date v-model="refuelDate" />
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <q-input outlined color="accent" v-model="refuelTime" label="Refuel time" >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="refuelTime" format24h/>
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </q-input>

    <div class="q-gutter-sm">
      <q-btn color="negative" label="Cancel" no-caps @click="$router.go(-1)" />
      <q-btn color="positive" label="Confirm" type="submit" no-caps />
    </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import { emitter } from 'src/boot/mitt'

const router = useRouter()

let payedAmount = ref(0.0)
let refueledAmount = ref(0.0)
let distanceDriven = ref(0.0)
let refuelDate = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'))
let refuelTime = ref(date.formatDate(Date.now(), 'HH:mm:ss'))

function onSubmit(evt?: SubmitEvent) {

  void router.go(-1)
}

onMounted(() => {
  const routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if(routePath.includes('add'))
    emitter.emit('updateTitle', 'Add refuel')
  else if(routePath.includes('edit'))
    emitter.emit('updateTitle', 'Edit refuel')
})

</script>
