<template>
  <div>
    <q-dialog :model-value="dialogVisible" @hide="$emit('update:dialogVisible')" 
      position="bottom" full-width>
      <q-card class="q-ma-md">
        <q-card-actions             
          v-for="(option, i) in options as OptionInDialog[]" 
          :key="i"
          >
          <q-btn 
            @click="option.action"
            class="row"
            style="width: 90%;"
            v-close-popup
            flat align="left"
            color="primary" 
            label=" ">{{ option.text }}</q-btn>
          <q-icon :name="option.icon" class="row" style="width: 10%;"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { OptionInDialog } from 'src/components/models'

defineProps({
  options: {
    type: Array,
    required: true
  },
  dialogVisible: {
    type: Boolean
  }
})
defineEmits([
  'update:dialogVisible'
])

</script>
