import { db } from 'src/boot/dexie'
import { Settings } from '../models'

async function getSettings(id: number): Promise<Settings | null> {
  return (await db.settings.filter(s => s.id === id).first()) ?? null
}

async function updateSettings(settings: Settings) {
  await db.settings.put(settings)
}

export default { getSettings, updateSettings }
