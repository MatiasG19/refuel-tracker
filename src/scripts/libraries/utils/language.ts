import { SelectOption } from 'src/components/inputs/types'
import { getLanguages } from 'src/scripts/staticData/languages'

export function getLanguageOptions(): SelectOption[] {
  return getLanguages().map(
    l =>
      ({
        label: l.text,
        value: l.id
      }) as SelectOption
  )
}
