/** Check if storage is persisted already.
  @returns {Promise<boolean>} Promise resolved with true if current origin is
  using persistent storage, false if not, and undefined if the API is not
  present.
*/
async function isStoragePersisted() {
  return navigator.storage && navigator.storage.persisted
    ? await navigator.storage.persisted()
    : undefined
}

/** Tries to convert to persisted storage.
  @returns {Promise<boolean>} Promise resolved with true if successfully
  persisted the storage, false if not, and undefined if the API is not present.
*/
async function persist() {
  return navigator.storage && navigator.storage.persist
    ? await navigator.storage.persist()
    : undefined
}

export async function initStoragePersistence(): Promise<boolean> {
  try {
    if (await isStoragePersisted()) return true

    const presisted = await persist()
    if (presisted) return true
  } catch (error) {
    return false
  }
  return false
}
