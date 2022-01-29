import { Dialog } from 'quasar'
import ConfirmDialog from 'src/components/ConfirmDialog.vue'
import OptionsDialog from 'src/components/OptionsDialog.vue'
import { OptionInDialog } from './models'

export function confirmDialog(promptMessage: string) {
  Dialog.create({
    component: ConfirmDialog,
    componentProps: {
      promptMessage,
      action: () => console.log('Dialog action!')
    }
  })
}

export function optionsDialog(options: OptionInDialog[]) {
  Dialog.create({
    component: OptionsDialog,
    componentProps: {
      options
    }
  })
}
