import { Dialog } from 'quasar'
import { SelectOption } from 'src/components/inputs/types'
import SelectDialog from './SelectDialog.vue'

export function selectDialog(
  label: string,
  options: SelectOption[],
  action: (id: number) => void
) {
  Dialog.create({
    component: SelectDialog,
    componentProps: {
      label,
      options,
      action
    }
  })
}
