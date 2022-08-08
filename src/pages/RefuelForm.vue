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
        label="Refuel date"
        :rules="[requiredFieldRule]"
        mask="date"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-date
            :modelValue="refuelDate"
            @update:modelValue="evt => updateDate(evt)"
          />
          <div class="row items-center justify-end">
            <q-btn v-close-popup label="Close" color="primary" flat />
          </div>
        </q-popup-proxy>
      </c-input>

      <c-input
        :value="refuelTime"
        label="Refuel time"
        :rules="[requiredFieldRule]"
      >
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time
            :modelValue="refuelTime"
            @update:modelValue="evt => updateTime(evt)"
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
import { date as QuasarDate } from 'quasar'
import { useRouter } from 'vue-router'
import CInput from 'src/components/inputs/CInput.vue'
import { emitter } from 'src/boot/mitt'
import { requiredFieldRule, numbersOnlyRule } from 'src/scripts/validationRules'
import { useRefuelStore } from 'src/stores'
import { Refuel } from 'src/scripts/models'

const router = useRouter()
const refuelStore = useRefuelStore()

const refuel = ref<Refuel>(new Refuel())
const refuelDate = ref(QuasarDate.formatDate(Date.now(), 'YYYY/MM/DD'))
const refuelTime = ref(QuasarDate.formatDate(Date.now(), 'HH:mm'))

// const refuelDate = computed(() =>
//   date.formatDate(refuel.value.date, 'YYYY/MM/DD')
// )
let routePath = ''

const props = defineProps({
  id: {
    type: Number
  }
})

function updateDate(event: string) {
  const date = new Date(event)
  refuelDate.value = QuasarDate.formatDate(date, 'YYYY/MM/DD')
  if (!refuel.value.date) refuel.value.date = date
  refuel.value.date.setFullYear(date.getFullYear())
  refuel.value.date.setMonth(date.getMonth())
  refuel.value.date.setDate(date.getDate())
  console.log(refuel.value)
}

function updateTime(event: string) {
  console.log(event)
  console.log(new Date(event))
  console.log(new Date(event).getHours())
  console.log(new Date(event).getMinutes())
  const date = new Date(event)
  if (!refuel.value.date) refuel.value.date = date
  refuelTime.value = QuasarDate.formatDate(date, 'HH:mm')
  refuel.value.date.setHours(date.getHours())
  refuel.value.date.setMinutes(date.getMinutes())
}

async function onSubmit() {
  if (routePath.includes('add'))
    await refuelStore.addRefuel({ ...refuel.value })
  else if (routePath.includes('edit'))
    await refuelStore.updateRefuel({ ...refuel.value })
  void router.go(-1)
}

onMounted(async () => {
  routePath = router.currentRoute.value.path.toLocaleLowerCase()
  if (routePath.includes('add')) emitter.emit('updateTitle', 'Add refuel')
  else if (routePath.includes('edit'))
    emitter.emit('updateTitle', 'Edit refuel')

  if (props.id) {
    const refuelToEdit = await refuelStore.getRefuel(props.id)
    if (refuelToEdit) {
      refuel.value.id = refuelToEdit.id
      refuel.value.payedAmount = refuelToEdit.payedAmount
      refuel.value.refueledAmount = refuelToEdit.refueledAmount
      refuel.value.distanceDriven = refuelToEdit.distanceDriven
      if (routePath.includes('edit')) {
        refuelDate.value = QuasarDate.formatDate(
          refuelToEdit.date,
          'YYYY/MM/DD'
        )
        refuelTime.value = QuasarDate.formatDate(refuelToEdit.date, 'HH:mm')
      } else console.error('Refuel not found!')
    }
  }
})
</script>

<style scoped>
.btn {
  width: 40%;
}
</style>
