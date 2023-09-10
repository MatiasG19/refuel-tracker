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
  console.log('navigator', window.navigator)
  console.log('navigator.storage', window.navigator.storage)
  console.log('persist', window.navigator.storage.persist)

  return navigator.storage && navigator.storage.persist
    ? await navigator.storage.persist()
    : undefined
}

export async function initStoragePersistence(): Promise<string> {
  try {
    if (await isStoragePersisted()) return 'true'

    const presisted = await navigator.storage.persisted()
    // await persist()
    if (presisted) return 'true'
  } catch (error: unknown) {
    return (error as Error).stack?.toString() ?? ''
  }
  return 'false ende'
}
