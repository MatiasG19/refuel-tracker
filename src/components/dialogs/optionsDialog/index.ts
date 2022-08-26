import { Dialog } from 'quasar'
import OptionsDialog from 'src/components/dialogs/optionsDialog/OptionsDialog.vue'

export class OptionInDialog {
  text!: string
  icon!: string
  action!: (data?: unknown) => void
}

export function optionsDialog(options: OptionInDialog[], data?: unknown) {
  Dialog.create({
    component: OptionsDialog,
    componentProps: {
      options,
      data
    }
  })
}
