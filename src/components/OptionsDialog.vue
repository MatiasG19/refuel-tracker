<template>
  <div>
    <q-dialog :model-value="dialogVisible" @hide="$emit('update:dialogVisible')"
      position="bottom" full-width>
      <q-card class="q-ma-md el-space-station">
        <q-card-actions
          v-for="(option, i) in options as OptionInDialog[]"
          :key="i"
        >
          <q-btn
            @click="option.action"
            class="row full-width"
            v-close-popup
            flat
            no-caps
            color="primary"
          >
            <template v-slot:default>
              <label>{{ option.text }}</label>
              <q-space/>
              <q-icon :name="option.icon" />
            </template>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { OptionInDialog } from 'src/scripts/models'

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
