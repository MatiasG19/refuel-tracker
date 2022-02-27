<template>
  <div>
    <q-form @submit="onSubmit" class="q-pa-md q-gutter-md">
      <c-input
        v-model="refuel.payedAmount"
        label="Payed amount"
        :rules="[requiredFieldRule, numbersOnlyRule]"
        autofocus
      />
      <c-input
        v-model="refuel.distanceDriven"
        label="Distance driven"
        :rules="[requiredFieldRule, numbersOnlyRule]"
      />
      <c-input
        v-model="refuel.refueledAmount"
        label="Refuled amount"
        :rules="[requiredFieldRule, numbersOnlyRule]"
      />

      <c-input
        :value="refuelDate"
        @update:value="(evt: string) => refuelDate = evt"
        label="Refuel date"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :modelValue="refuelDate"
            @update:modelValue="evt => (refuelDate = evt)"
          />
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <c-input
        :value="refuelTime"
        @update:value="(evt: string) => refuelTime = evt"
        outlined
        color="accent"
        label="Refuel time"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            :modelValue="refuelTime"
            @update:modelValue="evt => (refuelTime = evt?.toString() ?? '')"
            format24h
          />
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <div class="row">
        <q-btn
          color="negative"
          label="Cancel"
          no-caps
          class="btn"
          @click="$router.go(-1)"
        />
        <q-space />
        <q-btn
          color="positive"
          label="Confirm"
          type="submit"
          no-caps
          class="btn"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { date } from 'quasar'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import { emitter } from 'src/boot/mitt'
import { requiredFieldRule, numbersOnlyRule } from 'src/scripts/validationRules'
import { useRefuelStore } from 'src/stores'
import { Refuel } from 'src/scripts/models'

const router = useRouter()
const refuelStore = useRefuelStore()

const refuel = ref<Refuel>(new Refuel())
const refuelDate = ref(date.formatDate(Date.now(), 'YYYY/MM/DD'))
const refuelTime = ref(date.formatDate(Date.now(), 'HH:mm'))
let routePath = ''

const props = defineProps({
  id: {
    type: Number
  }
})

function onSubmit() {
  if (routePath.includes('add')) refuelStore.addRefuel(refuel.value)
  else if (routePath.includes('edit')) refuelStore.updateRefuel(refuel.value)
  void router.go(-1)
}

onMounted(() => {
  if (props.id) {
    const refuelToEdit = refuelStore.getRefuel(props.id)
    if (refuelToEdit) {
      refuel.value.id = refuelToEdit.id
      refuel.value.payedAmount = refuelToEdit.payedAmount
      refuel.value.refueledAmount = refuelToEdit.refueledAmount
      refuel.value.distanceDriven = refuelToEdit.distanceDriven
      refuelDate.value = refuelToEdit.date.toDateString()
      refuelTime.value = date.formatDate(refuelToEdit.date, 'HH:mm')
    } else console.error('Refuel not found!')
  }

  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('add')) emitter.emit('updateTitle', 'Add refuel')
  else if (routePath.includes('edit'))
    emitter.emit('updateTitle', 'Edit refuel')
})
</script>

<style scoped>
.btn {
  width: 40%;
}
</style>
