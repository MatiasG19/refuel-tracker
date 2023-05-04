import Dexie from 'dexie'
import 'dexie-export-import'
import { db } from 'src/boot/dexie'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

export async function exportDB() {
  const blob = await db.export()
  writeBlob(blob)
}

export async function importDB() {
  const blob = await readBlob()
  await db.import(blob)
}

async function writeBlob(blob: Blob) {
  const dataAsString = await blob.text()
  await Filesystem.writeFile({
    path: 'RefuelTrackerBackup.json',
    data: dataAsString,
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  })
}

async function readBlob(): Promise<Blob> {
  const result = await Filesystem.readFile({
    path: 'RefuelTrackerBackup.json',
    directory: Directory.Documents,
    encoding: Encoding.UTF8
  })

  return new Blob([result.data], {
    type: 'application/json'
  })
}
