<template>
  <div>
    <q-dialog ref="dialogRef" position="bottom" full-width>
      <q-card class="q-ma-md el-space-station">
        <q-card-actions>
          <c-select
            outlined
            class="q-pb-md"
            v-model="option"
            :options="props.options"
            :label="props.label"
            style="width: 100%"
          />
          <q-btn
            @click="onOkClick()"
            class="row full-width"
            v-close-popup
            flat
            no-caps
            color="primary"
          >
            {{ t('form.ok') }}
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from 'quasar'
import { SelectOption } from 'src/components/inputs/types'
import CSelect from 'src/components/inputs/CSelect.vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { dialogRef, onDialogOK } = useDialogPluginComponent()

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: {
    type: Array<SelectOption>,
    required: true
  },
  action: {
    type: Function,
    required: true
  }
})

const { t } = useI18n()
const option = ref<number | null>(null)

function onOkClick() {
  props.action(option.value)
  onDialogOK()
}

onMounted(() => {
  option.value = props.value
})
</script>
