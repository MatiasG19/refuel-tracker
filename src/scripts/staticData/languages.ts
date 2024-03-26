import { Language, SelectOption } from '../models'

export function getLanguages(): Language[] {
  return [
    { id: 1, text: 'System', code: '' },
    { id: 2, text: 'English', code: 'en' },
    { id: 3, text: 'Deutsch', code: 'de' }
  ]
}

export function getLanguageOptions(): SelectOption[] {
  return getLanguages().map(
    l =>
      ({
        label: l.text,
        value: l.id
      }) as SelectOption
  )
}
