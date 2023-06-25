import { registerPlugin } from '@capacitor/core'
import type { FilePickerPlugin } from './definitions'

const FilePicker = registerPlugin<FilePickerPlugin>('FilePicker')

export { FilePicker }
