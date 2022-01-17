<template>
    <q-page class="items-center justify-evenly">
      <div v-if="filterActive" class="q-pt-md text-center">
        <q-btn class="q-pa-xs" style="color:pink;" flat no-caps label=" " @click="removeFilter"
        icon-right="delete_outline">{{ filterHint }}</q-btn>
      </div>
      <refuel-entry-card
        v-for="(card, i) in cards"
        :key="i"
        :data="card"
        class="q-pt-md q-pl-md q-pr-md"
      />
    </q-page>
</template>

<script setup lang="ts">
import RefuelEntryCard from 'src/components/RefuelEntryCard.vue';
import { RefuelEntry } from 'src/components/models'
import { ref } from 'vue'

let filterActive = ref<boolean>(true)
const filterHint = 'Filter 1 Month from 2021.12.19'

const cards: RefuelEntry[] = [
  {
    id: 0,
    vehicleId: 0,
    date: new Date(),
    refuelAmount: 46.3,
    payedAmount: 75.34
  },
  {
    id: 1,
    vehicleId: 0,
    date: new Date(),
    refuelAmount: 46.3,
    payedAmount: 75.34
  },
  {
    id: 2,
    vehicleId: 0,
    date: new Date(),
    refuelAmount: 46.3,
    payedAmount: 75.34
  }
]

function removeFilter() {
  filterActive.value = false
}

</script>
