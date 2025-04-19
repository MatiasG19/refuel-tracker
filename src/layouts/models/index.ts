import { OptionInDialog } from 'src/components/dialogs/optionsDialog'
import { useI18n } from 'vue-i18n'
import messages from '../i18n'
import { useRouter } from 'vue-router'

interface Button {
  visible: boolean
  disabled: boolean
  icon: string
  color: string
  action: Action
}

interface Action {
  (): void
}

export { type Button, type Action }

export function getAddButtonDialogOptions() {
  const router = useRouter()
  const { t } = useI18n({ useScope: 'local', messages })

  const addExpenseDialogOptions: OptionInDialog[] = [
    {
      text: t('addDialog.vehicle'),
      icon: 'drive_eta',
      action: () => router.push({ path: `/vehicles/add` })
    },
    {
      text: t('addDialog.expense'),
      icon: 'attach_money',
      action: () => router.push({ path: `/vehicles/refuels/addExpense` })
    },
    {
      text: t('addDialog.refuel'),
      icon: 'local_gas_station',
      action: () => router.push({ path: `/vehicles/refuels/add` })
    }
  ]
  return { addExpenseDialogOptions }
}
