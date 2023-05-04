import Dexie from 'dexie'
import 'dexie-export-import'
import { db } from 'src/boot/dexie'

//
// Import from Blob or File to existing Dexie instance
//
export async function importDB() {
  //await db.import(blob) // equivalent to importInto()
}

//
// Export to Blob
//
export async function exportDB() {
  //const blob = await db.export() // equivalent to exportDB()
}
