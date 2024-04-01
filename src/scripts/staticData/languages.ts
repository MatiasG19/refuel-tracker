import { Language } from '../models'

export function getLanguages(): Language[] {
  return [
    // { id: 1, text: 'System', code: '' }, system language is added in vue file
    { id: 2, text: 'English', code: 'en' },
    { id: 3, text: 'Deutsch', code: 'de' }
  ]
}
