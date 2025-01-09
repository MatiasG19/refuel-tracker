import 'dexie-export-import'
import { db } from 'src/boot/dexie'
import { Filesystem, Encoding } from '@capacitor/filesystem'
import { getDateForFileName } from '../utils'
import { FilePicker } from 'src/plugins/capacitor-file-picker'
import { Platform } from 'quasar'

export async function exportDB(path: string) {
  const blob = await db.export()
  writeBlob(blob, path)
}

export async function importDB(path: string) {
  const blob = await readBlob(path)
  await db.import(blob, {
    overwriteValues: true,
    clearTablesBeforeImport: true,
    acceptVersionDiff: true
  })
}

async function writeBlob(blob: Blob, path: string) {
  const dataAsString = await blob.text()
  if (Platform.is.mobile) {
    FilePicker.createFile({
      path: path,
      fileName: `RefuelTrackerBackup_${getDateForFileName()}.json`,
      mimeType: '*/*',
      data: dataAsString
      // TODO encoding
      // encoding: Encoding.UTF8
    })
  }
}

async function readBlob(path: string): Promise<Blob> {
  if (Platform.is.mobile) {
    const result = await Filesystem.readFile({
      path: path,
      encoding: Encoding.UTF8
    })
    return new Blob([result.data], {
      type: 'application/json'
    })
  }
  return Promise.resolve(new Blob())
}
