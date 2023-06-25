import { PluginListenerHandle } from '@capacitor/core'

export interface FilePickerPlugin {
  /**
   * Open file explorer to pick a file path.
   * @param options
   */
  pickFile(options: { mimeType: string }): Promise<void>
  /**
   * Open file explorer to pick multiple file paths.
   * @param options
   */
  pickFiles(options: { mimeType: string }): Promise<void>
  /**
   * Open file explorer to pick directory path.
   */
  pickDir(): Promise<void>
  /**
   * Listen for file path result from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'filePathResult',
    listener: (res: { path: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Listen for file path results from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'filePathResults',
    listener: (res: { paths: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Listen for directory path result from activity result.
   * @param eventName
   * @param listener
   */
  addListener(
    eventName: 'dirPathResult',
    listener: (res: { path: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle
  /**
   * Remove all listeners.
   */
  removeAllListeners(): Promise<void>
}
