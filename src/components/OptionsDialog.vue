<template>
  <div>
    <q-dialog v-model="dialog">
      <q-card class="my-card">
        <q-card-actions>
          <q-btn 
            v-for="(option, i) in options as OptionInDialog[]" 
            :key="i"
            v-close-popup 
            flat 
            color="primary" 
            label="{{ option.name }}" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import { OptionInDialog } from 'src/components/models'

defineProps({
  options: {
    type: Array,
    required: true
  }
})

let dialog = ref(false)

</script>
