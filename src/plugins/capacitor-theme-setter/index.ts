import { registerPlugin } from '@capacitor/core'
import type { ThemeSetterPlugin } from './definitions'

const ThemeSetter = registerPlugin<ThemeSetterPlugin>('ThemeSetter')

export { ThemeSetter }
