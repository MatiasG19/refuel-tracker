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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  await Filesystem.writeFile({
    path: 'RefuelTrackerBackup.json',
    data: dataAsString,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    directory: Directory.Documents,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    encoding: Encoding.UTF8
  })
}

async function readBlob(): Promise<Blob> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  const result = await Filesystem.readFile({
    path: 'RefuelTrackerBackup.json',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    directory: Directory.Documents,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    encoding: Encoding.UTF8
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return new Blob([result.data], {
    type: 'application/json'
  })
}
