import { db } from 'src/boot/dexie'
import type { Settings } from '../models'

async function getSettings(id: number): Promise<Settings | null> {
  return (await db.settings.filter(s => s.id === id).first()) ?? null
}

async function updateSettings(settings: Settings) {
  await db.settings.update(settings.id ?? 0, settings)
}

export default { getSettings, updateSettings }
