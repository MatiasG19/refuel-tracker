import type ExportOptions from 'dexie'
import type ImportOptions from 'dexie'
import type StaticImportOptions from 'dexie'

declare module 'dexie' {
  // Extend methods on db
  interface Dexie {
    export(options?: ExportOptions): Promise<Blob>
    import(blob: Blob, options?: ImportOptions): Promise<void>
  }
  interface DexieConstructor {
    import(blob: Blob, options?: StaticImportOptions): Promise<Dexie>
  }
}
