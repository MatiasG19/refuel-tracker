<template>
  <div>
    <q-dialog :model-value="dialogVisible" @hide="$emit('update:dialogVisible')" no-backdrop-dismiss
      position="bottom" full-width>
      <q-card class="q-ma-md el-space-station">
        <q-card-section class="text-center">{{ label }}</q-card-section>
        <q-card-actions>
          <q-btn
            @click="$emit('update:dialogVisible')"
            class="column btn"
            v-close-popup
            no-caps
            color="negative"
            label="Cancel"
        />
        <q-space/>
        <q-btn
          class="column btn"
          v-close-popup
          no-caps
          color="positive"
          label="Confirm"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  label: {
    type: String,
    required: true
  },
  dialogVisible: {
    type: Boolean
  },
  action: {
    type: Function
  }
})
defineEmits([
  'update:dialogVisible'
])

</script>

<style scoped>
.btn {
  width: 40%;
}
</style>
