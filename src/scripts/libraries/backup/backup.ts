import 'dexie-export-import'
import { db } from 'src/boot/dexie'
import { Filesystem, Encoding } from '@capacitor/filesystem'
import { getDateForFileName } from '../utils'
import { FilePicker } from 'src/plugins/capacitor-file-picker'

export async function exportDB(path: string) {
  const blob = await db.export()
  writeBlob(blob, path)
}

export async function importDB(path: string) {
  const blob = await readBlob(path)
  await db.import(blob, { overwriteValues: true })
}

async function writeBlob(blob: Blob, path: string) {
  const dataAsString = await blob.text()
  FilePicker.createFile({
    path: path,
    fileName: `RefuelTrackerBackup_${getDateForFileName()}.json`,
    mimeType: '*/*',
    data: dataAsString
    // TODO encoding
    // encoding: Encoding.UTF8
  })
}

async function readBlob(path: string): Promise<Blob> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const result = await Filesystem.readFile({
    path: path,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    encoding: Encoding.UTF8
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return new Blob([result.data], {
    type: 'application/json'
  })
}
