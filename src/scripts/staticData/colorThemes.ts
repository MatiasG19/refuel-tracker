import { type ColorTheme } from '../models'
import { i18n } from 'src/boot/i18n'

export function getColorThemes(): ColorTheme[] {
  const { t } = i18n.global
  return [
    {
      label: t('sections.settings.colorTheme.themes.spaceStation'),
      value: 0,
      dark: true,
      className: 'theme-space-station'
    },
    {
      label: t('sections.settings.colorTheme.themes.light'),
      value: 1,
      dark: false,
      className: 'theme-light'
    },
    {
      label: t('sections.settings.colorTheme.themes.dark'),
      value: 2,
      dark: true,
      className: 'theme-dark'
    }
  ]
}
